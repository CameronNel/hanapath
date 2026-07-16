/**
 * HanaPath browser adapter for the $Q Super-Quick Recognizer.
 *
 * Original JavaScript implementation:
 * Copyright (c) 2018-2019 Nathan Magrofuoco, Jacob O. Wobbrock,
 * Radu-Daniel Vatavu, and Lisa Anthony. All rights reserved.
 *
 * This software is distributed under the "New BSD License" agreement:
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *   * Redistributions of source code must retain the above copyright notice,
 *     this list of conditions and the following disclaimer.
 *   * Redistributions in binary form must reproduce the above copyright
 *     notice, this list of conditions and the following disclaimer in the
 *     documentation and/or other materials provided with the distribution.
 *   * Neither the names of the University Stefan cel Mare of Suceava,
 *     University of Washington, nor University of Florida, nor the names of
 *     its contributors may be used to endorse or promote products derived from
 *     this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL RADU-DANIEL VATAVU, LISA ANTHONY, JACOB O.
 * WOBBROCK, NATHAN MAGROFUOCO, OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * Paper: Vatavu, Anthony & Wobbrock (2018), "$Q: A super-quick,
 * articulation-invariant stroke-gesture recognizer for low-resource devices."
 * https://depts.washington.edu/acelab/proj/dollar/qdollar.html
 *
 * This adapter removes the demo gestures, accepts HanaPath stroke arrays, adds
 * guarded preprocessing, and returns ranked matches. It remains dependency-free
 * and exposes one browser global: window.HANAPATH_HANGUL_RECOGNIZER.
 */
(function attachHangulRecognizer(global) {
  "use strict";

  var NUM_POINTS = 32;
  var MAX_INT_COORD = 1024;
  var LUT_SIZE = 64;
  var LUT_SCALE = MAX_INT_COORD / LUT_SIZE;
  var WEIGHT_SUM = (NUM_POINTS * (NUM_POINTS + 1)) / 2;
  // $Q's point cloud is intentionally articulation-invariant, but that can
  // make glyphs which differ by one bar or one open side nearly tie. Small
  // axis/edge, distinct-line, and closure terms preserve those structural
  // distinctions while leaving the point cloud as the dominant signal.
  var EDGE_STRUCTURE_WEIGHT = 0.025;
  var BAND_STRUCTURE_WEIGHT = 0.01;
  var FRAME_CLOSURE_WEIGHT = 0.004;
  var AXIS_DOMINANCE = 1.25;
  var BAND_AXIS_DOMINANCE = 2.5;
  var BAND_CLUSTER_TOLERANCE = 0.1;
  var BAND_MIN_COVERAGE = 0.12;

  function Point(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.intX = 0;
    this.intY = 0;
  }

  function distanceSquared(a, b) {
    var dx = b.x - a.x;
    var dy = b.y - a.y;
    return dx * dx + dy * dy;
  }

  function distance(a, b) {
    return Math.sqrt(distanceSquared(a, b));
  }

  function pathLength(points) {
    var total = 0;
    for (var i = 1; i < points.length; i += 1) {
      if (points[i].id === points[i - 1].id) total += distance(points[i - 1], points[i]);
    }
    return total;
  }

  function resample(source, count) {
    var points = source.map(function clone(p) { return new Point(p.x, p.y, p.id); });
    var total = pathLength(points);
    if (points.length < 2 || total < 1e-7) return null;
    var interval = total / (count - 1);
    var carried = 0;
    var output = [new Point(points[0].x, points[0].y, points[0].id)];
    for (var i = 1; i < points.length && output.length < count; i += 1) {
      if (points[i].id !== points[i - 1].id) continue;
      var segment = distance(points[i - 1], points[i]);
      if (segment < 1e-9) continue;
      if (carried + segment >= interval) {
        var ratio = (interval - carried) / segment;
        var q = new Point(
          points[i - 1].x + ratio * (points[i].x - points[i - 1].x),
          points[i - 1].y + ratio * (points[i].y - points[i - 1].y),
          points[i].id
        );
        output.push(q);
        points.splice(i, 0, q);
        carried = 0;
      } else {
        carried += segment;
      }
    }
    var last = points[points.length - 1];
    while (output.length < count) output.push(new Point(last.x, last.y, last.id));
    return output.slice(0, count);
  }

  function scale(points) {
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    points.forEach(function each(p) {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    });
    var size = Math.max(maxX - minX, maxY - minY);
    if (!Number.isFinite(size) || size < 1e-7) return null;
    return points.map(function map(p) {
      return new Point((p.x - minX) / size, (p.y - minY) / size, p.id);
    });
  }

  function translateToOrigin(points) {
    var cx = 0;
    var cy = 0;
    points.forEach(function each(p) { cx += p.x; cy += p.y; });
    cx /= points.length;
    cy /= points.length;
    return points.map(function map(p) { return new Point(p.x - cx, p.y - cy, p.id); });
  }

  function makeIntegerCoordinates(points) {
    points.forEach(function each(p) {
      p.intX = Math.max(0, Math.min(MAX_INT_COORD - 1, Math.round((p.x + 1) * 0.5 * (MAX_INT_COORD - 1))));
      p.intY = Math.max(0, Math.min(MAX_INT_COORD - 1, Math.round((p.y + 1) * 0.5 * (MAX_INT_COORD - 1))));
    });
    return points;
  }

  function lutIndex(value) {
    return Math.max(0, Math.min(LUT_SIZE - 1, Math.round(value / LUT_SCALE)));
  }

  function computeLookupTable(points) {
    var lut = Array.from({ length: LUT_SIZE }, function row() { return new Array(LUT_SIZE); });
    for (var x = 0; x < LUT_SIZE; x += 1) {
      for (var y = 0; y < LUT_SIZE; y += 1) {
        var bestIndex = 0;
        var best = Infinity;
        for (var i = 0; i < points.length; i += 1) {
          var row = lutIndex(points[i].intX);
          var col = lutIndex(points[i].intY);
          var dx = row - x;
          var dy = col - y;
          var d = dx * dx + dy * dy;
          if (d < best) {
            best = d;
            bestIndex = i;
          }
        }
        lut[x][y] = bestIndex;
      }
    }
    return lut;
  }

  function flattenStrokes(strokes) {
    var points = [];
    (strokes || []).forEach(function eachStroke(stroke, strokeIndex) {
      (stroke || []).forEach(function eachPoint(raw) {
        var x = Array.isArray(raw) ? raw[0] : raw && raw.x;
        var y = Array.isArray(raw) ? raw[1] : raw && raw.y;
        if (Number.isFinite(x) && Number.isFinite(y)) points.push(new Point(x, y, strokeIndex + 1));
      });
    });
    return points;
  }

  function countDistinctBands(samples) {
    if (!samples.length) return 0;
    var sorted = samples.slice().sort(function sortBands(a, b) { return a.position - b.position; });
    var clusters = [];
    sorted.forEach(function addSample(sample) {
      var cluster = clusters[clusters.length - 1];
      if (!cluster || Math.abs(sample.position - cluster.position) > BAND_CLUSTER_TOLERANCE) {
        clusters.push({ position: sample.position, coverage: sample.coverage });
        return;
      }
      var combinedCoverage = cluster.coverage + sample.coverage;
      cluster.position = (cluster.position * cluster.coverage + sample.position * sample.coverage) / combinedCoverage;
      cluster.coverage = combinedCoverage;
    });
    return clusters.filter(function substantial(cluster) {
      return cluster.coverage >= BAND_MIN_COVERAGE;
    }).length;
  }

  function structuralSignature(strokes) {
    var rawPoints = [];
    (strokes || []).forEach(function collectStroke(stroke) {
      (stroke || []).forEach(function collectPoint(raw) {
        var x = Array.isArray(raw) ? raw[0] : raw && raw.x;
        var y = Array.isArray(raw) ? raw[1] : raw && raw.y;
        if (Number.isFinite(x) && Number.isFinite(y)) rawPoints.push([x, y]);
      });
    });
    if (rawPoints.length < 2) return { edges: [0, 0, 0, 0, 0, 0], bands: [0, 0], closure: 0 };

    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    rawPoints.forEach(function measure(point) {
      minX = Math.min(minX, point[0]);
      minY = Math.min(minY, point[1]);
      maxX = Math.max(maxX, point[0]);
      maxY = Math.max(maxY, point[1]);
    });
    var width = Math.max(1e-7, maxX - minX);
    var height = Math.max(1e-7, maxY - minY);
    var size = Math.max(width, height);
    var positionWidth = Math.max(width, size * 0.2);
    var positionHeight = Math.max(height, size * 0.2);
    var centerX = (minX + maxX) * 0.5;
    var centerY = (minY + maxY) * 0.5;
    var vertical = [0, 0, 0];
    var horizontal = [0, 0, 0];
    var verticalBandSamples = [];
    var horizontalBandSamples = [];

    (strokes || []).forEach(function measureStroke(stroke) {
      for (var i = 1; i < (stroke || []).length; i += 1) {
        var first = stroke[i - 1];
        var second = stroke[i];
        var firstX = Array.isArray(first) ? first[0] : first && first.x;
        var firstY = Array.isArray(first) ? first[1] : first && first.y;
        var secondX = Array.isArray(second) ? second[0] : second && second.x;
        var secondY = Array.isArray(second) ? second[1] : second && second.y;
        if (![firstX, firstY, secondX, secondY].every(Number.isFinite)) continue;

        // Use isotropic direction scaling so ordinary pen jitter does not turn
        // a nearly one-dimensional bar into several perpendicular segments.
        var dx = (secondX - firstX) / size;
        var dy = (secondY - firstY) / size;
        var absX = Math.abs(dx);
        var absY = Math.abs(dy);
        if (absX + absY < 1e-7) continue;
        // Preserve relative placement, but give a thin axis a small floor so
        // jitter along a single row/column still clusters as one visible bar.
        var midpointX = ((firstX + secondX) * 0.5 - centerX) / positionWidth + 0.5;
        var midpointY = ((firstY + secondY) * 0.5 - centerY) / positionHeight + 0.5;

        if (absY >= absX * AXIS_DOMINANCE) {
          var xBin = midpointX < 1 / 3 ? 0 : midpointX > 2 / 3 ? 2 : 1;
          vertical[xBin] += absY;
        }
        if (absX >= absY * AXIS_DOMINANCE) {
          var yBin = midpointY < 1 / 3 ? 0 : midpointY > 2 / 3 ? 2 : 1;
          horizontal[yBin] += absX;
        }
        // A stricter orientation gate counts distinct straight rows/columns.
        // Clustering collapses retracing and jitter along the same visible bar
        // while preserving an additional parallel bar as real structure.
        if (absY >= absX * BAND_AXIS_DOMINANCE) {
          verticalBandSamples.push({ position: midpointX, coverage: absY });
        }
        if (absX >= absY * BAND_AXIS_DOMINANCE) {
          horizontalBandSamples.push({ position: midpointY, coverage: absX });
        }
      }
    });

    // Cap repeated or retraced edges: structure records which sides exist,
    // rather than rewarding a learner for tracing the same side twice.
    var edges = vertical.concat(horizontal).map(function cap(value) { return Math.min(1, value); });
    // A frame is closed only when both vertical sides and both horizontal
    // sides are present. Circles receive a soft closure value from their edge
    // coverage, while an open side drives the value to zero.
    var closure = Math.min(edges[0], edges[2], edges[3], edges[5]);
    return {
      edges: edges,
      bands: [countDistinctBands(verticalBandSamples), countDistinctBands(horizontalBandSamples)],
      closure: closure,
    };
  }

  function structuralDistance(first, second) {
    if (!first?.edges || !second?.edges || first.edges.length !== second.edges.length || !first.edges.length) {
      return { edges: 0, bands: 0, closure: 0 };
    }
    var total = 0;
    for (var i = 0; i < first.edges.length; i += 1) total += Math.abs(first.edges[i] - second.edges[i]);
    var firstBands = first.bands || [0, 0];
    var secondBands = second.bands || [0, 0];
    var bandDistance = 0;
    for (var j = 0; j < 2; j += 1) {
      bandDistance += Math.abs(firstBands[j] - secondBands[j]) / Math.max(1, firstBands[j], secondBands[j]);
    }
    return {
      edges: total / first.edges.length,
      bands: bandDistance / 2,
      closure: Math.abs(first.closure - second.closure),
    };
  }

  function prepare(name, strokes) {
    var sampled = resample(flattenStrokes(strokes), NUM_POINTS);
    if (!sampled) return null;
    var scaled = scale(sampled);
    if (!scaled) return null;
    var points = makeIntegerCoordinates(translateToOrigin(scaled));
    return {
      name: String(name || ""),
      points: points,
      lut: computeLookupTable(points),
      structure: structuralSignature(strokes),
    };
  }

  function cloudDistance(first, second, start, minimum) {
    var unmatched = Array.from({ length: first.length }, function index(_, i) { return i; });
    var i = start;
    var weight = first.length;
    var sum = 0;
    do {
      var matchPosition = 0;
      var best = Infinity;
      for (var j = 0; j < unmatched.length; j += 1) {
        var d = distanceSquared(first[i], second[unmatched[j]]);
        if (d < best) {
          best = d;
          matchPosition = j;
        }
      }
      unmatched.splice(matchPosition, 1);
      sum += weight * best;
      if (sum >= minimum) return sum;
      weight -= 1;
      i = (i + 1) % first.length;
    } while (i !== start);
    return sum;
  }

  function lowerBounds(first, second, step, lut) {
    var n = first.length;
    var bounds = new Array(Math.floor(n / step) + 1);
    var sums = new Array(n);
    bounds[0] = 0;
    for (var i = 0; i < n; i += 1) {
      var index = lut[lutIndex(first[i].intX)][lutIndex(first[i].intY)];
      var d = distanceSquared(first[i], second[index]);
      sums[i] = i === 0 ? d : sums[i - 1] + d;
      bounds[0] += (n - i) * d;
    }
    for (var cursor = step, slot = 1; cursor < n; cursor += step, slot += 1) {
      bounds[slot] = bounds[0] + cursor * sums[n - 1] - n * sums[cursor - 1];
    }
    return bounds;
  }

  function cloudMatch(candidate, template) {
    var n = candidate.points.length;
    var step = Math.max(1, Math.floor(Math.sqrt(n)));
    var firstBounds = lowerBounds(candidate.points, template.points, step, template.lut);
    var secondBounds = lowerBounds(template.points, candidate.points, step, candidate.lut);
    var best = Infinity;
    for (var i = 0, slot = 0; i < n; i += step, slot += 1) {
      if (firstBounds[slot] < best) best = Math.min(best, cloudDistance(candidate.points, template.points, i, best));
      if (secondBounds[slot] < best) best = Math.min(best, cloudDistance(template.points, candidate.points, i, best));
    }
    return best;
  }

  function confidence(distanceValue) {
    if (!Number.isFinite(distanceValue)) return 0;
    var weightedMean = Math.max(0, distanceValue) / WEIGHT_SUM;
    return Math.max(0, Math.min(1, 1 - Math.sqrt(weightedMean)));
  }

  function Recognizer() {
    this.templates = [];
  }

  function transformTemplateStrokes(strokes, scaleX, scaleY, slant) {
    return (strokes || []).map(function mapStroke(stroke) {
      return (stroke || []).map(function mapPoint(raw) {
        var x = Array.isArray(raw) ? raw[0] : raw.x;
        var y = Array.isArray(raw) ? raw[1] : raw.y;
        return [(x - 0.5) * scaleX + (y - 0.5) * slant + 0.5, (y - 0.5) * scaleY + 0.5];
      });
    });
  }

  Recognizer.prototype.add = function add(name, strokes, options) {
    var variants = [[1, 1, 0]];
    if (options && options.augment) {
      variants.push([0.82, 1, 0], [1, 0.82, 0], [1, 1, 0.12], [1, 1, -0.12]);
    }
    var added = 0;
    variants.forEach((function addVariant(spec) {
      var template = prepare(name, transformTemplateStrokes(strokes, spec[0], spec[1], spec[2]));
      if (template) {
        this.templates.push(template);
        added += 1;
      }
    }).bind(this));
    return added;
  };

  Recognizer.prototype.recognize = function recognize(strokes, limit) {
    var candidate = prepare("", strokes);
    if (!candidate || !this.templates.length) return [];
    var bestByName = new Map();
    this.templates.forEach(function compare(template) {
      var pointCloudDistance = cloudMatch(candidate, template);
      var structureDistance = structuralDistance(candidate.structure, template.structure);
      var structuralPenalty = structureDistance.edges * EDGE_STRUCTURE_WEIGHT
        + structureDistance.bands * BAND_STRUCTURE_WEIGHT
        + structureDistance.closure * FRAME_CLOSURE_WEIGHT;
      var d = pointCloudDistance + structuralPenalty * WEIGHT_SUM;
      var previous = bestByName.get(template.name);
      if (!previous || d < previous.distance) {
        bestByName.set(template.name, { name: template.name, distance: d, confidence: confidence(d) });
      }
    });
    return Array.from(bestByName.values())
      .sort(function sort(a, b) { return a.distance - b.distance || a.name.localeCompare(b.name); })
      .slice(0, Math.max(1, Number(limit) || 3));
  };

  global.HANAPATH_HANGUL_RECOGNIZER = Object.freeze({
    Recognizer: Recognizer,
    algorithm: "$Q",
    license: "New BSD",
    source: "https://depts.washington.edu/acelab/proj/dollar/qdollar.html",
  });
})(typeof window !== "undefined" ? window : globalThis);
