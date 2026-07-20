package io.github.cameronnel.hanapath;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.google.mlkit.common.model.DownloadConditions;
import com.google.mlkit.common.model.RemoteModelManager;
import com.google.mlkit.vision.digitalink.recognition.DigitalInkRecognition;
import com.google.mlkit.vision.digitalink.recognition.DigitalInkRecognitionModel;
import com.google.mlkit.vision.digitalink.recognition.DigitalInkRecognitionModelIdentifier;
import com.google.mlkit.vision.digitalink.recognition.DigitalInkRecognizer;
import com.google.mlkit.vision.digitalink.recognition.DigitalInkRecognizerOptions;
import com.google.mlkit.vision.digitalink.recognition.Ink;
import com.google.mlkit.vision.digitalink.recognition.RecognitionContext;
import com.google.mlkit.vision.digitalink.recognition.WritingArea;
import com.google.mlkit.vision.digitalink.common.RecognitionCandidate;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.List;

@CapacitorPlugin(name = "HangulRecognition")
public class HangulRecognitionPlugin extends Plugin {
    private DigitalInkRecognitionModel model;
    private RemoteModelManager modelManager;
    private DigitalInkRecognizer recognizer;
    private boolean isDownloading = false;

    @Override
    public void load() {
        super.load();
        modelManager = RemoteModelManager.getInstance();
        try {
            DigitalInkRecognitionModelIdentifier modelIdentifier =
                DigitalInkRecognitionModelIdentifier.fromLanguageTag("ko");
            if (modelIdentifier != null) {
                model = DigitalInkRecognitionModel.builder(modelIdentifier).build();
                recognizer = DigitalInkRecognition.getClient(
                    DigitalInkRecognizerOptions.builder(model).build()
                );
            }
        } catch (Exception e) {
            model = null;
            recognizer = null;
        }
    }

    @Override
    protected void handleOnDestroy() {
        if (recognizer != null) {
            recognizer.close();
            recognizer = null;
        }
        super.handleOnDestroy();
    }

    /**
     * Helper to validate the incoming strokes array.
     * Returns null if valid, or an error message string if invalid.
     */
    public static String validateStrokes(JSArray strokesArray) {
        if (strokesArray == null || strokesArray.length() == 0) {
            return "Invalid or empty strokes payload";
        }
        if (strokesArray.length() > 500) {
            return "Payload size exceeds maximum allowed strokes (500)";
        }
        int totalPoints = 0;
        for (int i = 0; i < strokesArray.length(); i++) {
            try {
                JSONArray strokePoints = strokesArray.getJSONArray(i);
                if (strokePoints.length() == 0) {
                    return "Stroke must contain at least one point";
                }
                if (strokePoints.length() > 1000) {
                    return "Stroke point count exceeds maximum (1000)";
                }
                totalPoints += strokePoints.length();
                if (totalPoints > 20000) {
                    return "Payload point count exceeds maximum (20000)";
                }
                for (int j = 0; j < strokePoints.length(); j++) {
                    JSONObject pointObj = strokePoints.getJSONObject(j);
                    if (!pointObj.has("x") || !pointObj.has("y") || !pointObj.has("t")) {
                        return "Missing coordinates or timestamp field";
                    }
                    double x = pointObj.getDouble("x");
                    double y = pointObj.getDouble("y");
                    double t = pointObj.getDouble("t");

                    if (!Double.isFinite(x) || !Double.isFinite(y) || !Double.isFinite(t)) {
                        return "Non-finite coordinates or timestamps detected";
                    }
                    if (x < -1000 || x > 5000 || y < -1000 || y > 5000) {
                        return "Coordinates out of reasonable bounds";
                    }
                }
            } catch (JSONException e) {
                return "Malformed JSON payload: " + e.getMessage();
            }
        }
        return null;
    }

    @PluginMethod
    public void checkModelStatus(PluginCall call) {
        if (model == null) {
            call.reject("Korean language model identifier not available", "MODEL_UNAVAILABLE");
            return;
        }
        modelManager.isModelDownloaded(model)
            .addOnSuccessListener(isDownloaded -> {
                if (!isDownloaded || recognizer == null) {
                    call.resolve(makeModelStatus(isDownloaded, false));
                    return;
                }

                // Exercise the same recognizer/context pipeline before checkout can
                // be shown. The sample is a simple 가 written in a 480px square.
                Ink.Builder warmUpInk = Ink.builder();
                warmUpInk.addStroke(Ink.Stroke.builder()
                    .addPoint(Ink.Point.create(90, 110, 1))
                    .addPoint(Ink.Point.create(240, 110, 2))
                    .addPoint(Ink.Point.create(240, 310, 3))
                    .build());
                warmUpInk.addStroke(Ink.Stroke.builder()
                    .addPoint(Ink.Point.create(325, 80, 4))
                    .addPoint(Ink.Point.create(325, 330, 5))
                    .build());
                warmUpInk.addStroke(Ink.Stroke.builder()
                    .addPoint(Ink.Point.create(325, 195, 6))
                    .addPoint(Ink.Point.create(405, 195, 7))
                    .build());
                RecognitionContext warmUpContext = RecognitionContext.builder()
                    .setPreContext("")
                    .setWritingArea(new WritingArea(480, 480))
                    .build();
                recognizer.recognize(warmUpInk.build(), warmUpContext)
                    .addOnSuccessListener(result ->
                        call.resolve(makeModelStatus(true, !result.getCandidates().isEmpty())))
                    .addOnFailureListener(e ->
                        call.reject("Korean recognizer warm-up failed", "MODEL_WARMUP_FAILED", e));
            })
            .addOnFailureListener(e -> {
                call.reject("Failed to check model status", "MODEL_STATUS_FAILED", e);
            });
    }

    private JSObject makeModelStatus(boolean downloaded, boolean operational) {
        JSObject ret = new JSObject();
        ret.put("downloaded", downloaded);
        ret.put("operational", operational);
        ret.put("downloading", isDownloading);
        // ML Kit Korean digital ink model size is roughly 20 MiB
        ret.put("sizeBytes", 20 * 1024 * 1024);
        return ret;
    }

    @PluginMethod
    public void downloadModel(PluginCall call) {
        if (model == null) {
            call.reject("Korean language model identifier not available", "MODEL_UNAVAILABLE");
            return;
        }
        if (isDownloading) {
            call.reject("Model download is already in progress", "MODEL_DOWNLOAD_IN_PROGRESS");
            return;
        }
        isDownloading = true;
        modelManager.download(model, new DownloadConditions.Builder().build())
            .addOnSuccessListener(aVoid -> {
                isDownloading = false;
                JSObject ret = new JSObject();
                ret.put("status", "success");
                call.resolve(ret);
            })
            .addOnFailureListener(e -> {
                isDownloading = false;
                call.reject("Model download failed", "MODEL_DOWNLOAD_FAILED", e);
            });
    }

    @PluginMethod
    public void recognize(PluginCall call) {
        if (model == null || recognizer == null) {
            call.reject("Korean language model identifier not available", "MODEL_UNAVAILABLE");
            return;
        }

        long startTime = System.currentTimeMillis();
        String preContext = call.getString("preContext", "");
        if (preContext == null) preContext = "";
        int preContextCodePoints = preContext.codePointCount(0, preContext.length());
        if (preContextCodePoints > 20) {
            int start = preContext.offsetByCodePoints(0, preContextCodePoints - 20);
            preContext = preContext.substring(start);
        }
        final String recognitionPreContext = preContext;

        JSArray strokesArray = call.getArray("strokes");
        String validationError = validateStrokes(strokesArray);
        if (validationError != null) {
            call.reject(validationError, "INVALID_STROKES");
            return;
        }
        Double width = call.getDouble("width");
        Double height = call.getDouble("height");
        if (width == null || height == null || !Double.isFinite(width) || !Double.isFinite(height)
                || width <= 0 || height <= 0 || width > 5000 || height > 5000) {
            call.reject("Invalid writing area", "INVALID_WRITING_AREA");
            return;
        }

        modelManager.isModelDownloaded(model)
            .addOnSuccessListener(isDownloaded -> {
                if (!isDownloaded) {
                    call.reject("Model not downloaded", "MODEL_NOT_DOWNLOADED");
                    return;
                }

                try {
                    Ink.Builder inkBuilder = Ink.builder();
                    for (int i = 0; i < strokesArray.length(); i++) {
                        JSONArray strokePoints = strokesArray.getJSONArray(i);
                        Ink.Stroke.Builder strokeBuilder = Ink.Stroke.builder();
                        for (int j = 0; j < strokePoints.length(); j++) {
                            JSONObject pointObj = strokePoints.getJSONObject(j);
                            double x = pointObj.getDouble("x");
                            double y = pointObj.getDouble("y");
                            long t = pointObj.getLong("t");

                            strokeBuilder.addPoint(Ink.Point.create((float) x, (float) y, t));
                        }
                        inkBuilder.addStroke(strokeBuilder.build());
                    }

                    Ink ink = inkBuilder.build();
                    RecognitionContext context = RecognitionContext.builder()
                        .setPreContext(recognitionPreContext)
                        .setWritingArea(new WritingArea(width.floatValue(), height.floatValue()))
                        .build();

                    recognizer.recognize(ink, context)
                        .addOnSuccessListener(result -> {
                            long latencyMs = System.currentTimeMillis() - startTime;
                            List<RecognitionCandidate> list = result.getCandidates();
                            JSArray candidates = new JSArray();
                            for (RecognitionCandidate c : list) {
                                JSObject cand = new JSObject();
                                cand.put("name", c.getText());
                                // Text-recognition models generally do not expose scores;
                                // omit the field instead of inventing a confidence value.
                                if (c.getScore() != null) {
                                    cand.put("score", c.getScore().doubleValue());
                                }
                                candidates.put(cand);
                            }
                            JSObject ret = new JSObject();
                            ret.put("provider", "mlkit");
                            ret.put("ready", true);
                            ret.put("candidates", candidates);
                            ret.put("latencyMs", latencyMs);
                            call.resolve(ret);
                        })
                        .addOnFailureListener(e -> {
                            call.reject("Recognition failed", "RECOGNITION_FAILED", e);
                        });

                } catch (JSONException e) {
                    call.reject("Malformed JSON payload", "INVALID_STROKES", e);
                }
            })
            .addOnFailureListener(e -> {
                call.reject("Failed checking model state during recognition", "MODEL_STATUS_FAILED", e);
            });
    }
}
