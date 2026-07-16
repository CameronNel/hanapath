package io.github.cameronnel.hanapath;

import static org.junit.Assert.*;

import com.getcapacitor.JSArray;
import org.json.JSONException;
import org.junit.Test;

public class HangulRecognitionPluginTest {

    @Test
    public void testNullOrEmptyStrokes() {
        assertNotNull(HangulRecognitionPlugin.validateStrokes(null));
        assertNotNull(HangulRecognitionPlugin.validateStrokes(new JSArray()));
    }

    @Test
    public void testValidStrokes() throws JSONException {
        JSArray valid = new JSArray("[[{\"x\": 100, \"y\": 200, \"t\": 1500}, {\"x\": 105, \"y\": 205, \"t\": 1516}]]");
        assertNull(HangulRecognitionPlugin.validateStrokes(valid));
    }

    @Test
    public void testEmptyStroke() throws JSONException {
        JSArray invalid = new JSArray("[[]]");
        assertEquals("Stroke must contain at least one point", HangulRecognitionPlugin.validateStrokes(invalid));
    }

    @Test
    public void testTooManyStrokes() throws JSONException {
        // Build an array with 501 strokes
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < 501; i++) {
            sb.append("[{\"x\": 1, \"y\": 1, \"t\": 1}]");
            if (i < 500) sb.append(",");
        }
        sb.append("]");
        JSArray invalid = new JSArray(sb.toString());
        assertEquals("Payload size exceeds maximum allowed strokes (500)", HangulRecognitionPlugin.validateStrokes(invalid));
    }

    @Test
    public void testTooManyPointsInStroke() throws JSONException {
        // Build a stroke with 1001 points
        StringBuilder sb = new StringBuilder("[[");
        for (int i = 0; i < 1001; i++) {
            sb.append("{\"x\": 1, \"y\": 1, \"t\": 1}");
            if (i < 1000) sb.append(",");
        }
        sb.append("]]");
        JSArray invalid = new JSArray(sb.toString());
        assertEquals("Stroke point count exceeds maximum (1000)", HangulRecognitionPlugin.validateStrokes(invalid));
    }

    @Test
    public void testTooManyTotalPoints() throws JSONException {
        StringBuilder sb = new StringBuilder("[");
        for (int stroke = 0; stroke < 21; stroke++) {
            sb.append("[");
            for (int point = 0; point < 1000; point++) {
                sb.append("{\"x\": 1, \"y\": 1, \"t\": 1}");
                if (point < 999) sb.append(",");
            }
            sb.append("]");
            if (stroke < 20) sb.append(",");
        }
        sb.append("]");
        JSArray invalid = new JSArray(sb.toString());
        assertEquals("Payload point count exceeds maximum (20000)", HangulRecognitionPlugin.validateStrokes(invalid));
    }

    @Test
    public void testMissingFields() throws JSONException {
        JSArray missingX = new JSArray("[[{\"y\": 200, \"t\": 1500}]]");
        JSArray missingY = new JSArray("[[{\"x\": 100, \"t\": 1500}]]");
        JSArray missingT = new JSArray("[[{\"x\": 100, \"y\": 200}]]");

        assertNotNull(HangulRecognitionPlugin.validateStrokes(missingX));
        assertNotNull(HangulRecognitionPlugin.validateStrokes(missingY));
        assertNotNull(HangulRecognitionPlugin.validateStrokes(missingT));
    }

    @Test
    public void testNonFiniteCoordinates() throws JSONException {
        JSArray nanX = new JSArray("[[{\"x\": NaN, \"y\": 200, \"t\": 1500}]]");
        JSArray infY = new JSArray("[[{\"x\": 100, \"y\": Infinity, \"t\": 1500}]]");

        assertEquals("Non-finite coordinates or timestamps detected", HangulRecognitionPlugin.validateStrokes(nanX));
        assertEquals("Non-finite coordinates or timestamps detected", HangulRecognitionPlugin.validateStrokes(infY));
    }

    @Test
    public void testOutOfBoundsCoordinates() throws JSONException {
        JSArray outLowX = new JSArray("[[{\"x\": -1001, \"y\": 200, \"t\": 1500}]]");
        JSArray outHighY = new JSArray("[[{\"x\": 100, \"y\": 5001, \"t\": 1500}]]");

        assertEquals("Coordinates out of reasonable bounds", HangulRecognitionPlugin.validateStrokes(outLowX));
        assertEquals("Coordinates out of reasonable bounds", HangulRecognitionPlugin.validateStrokes(outHighY));
    }
}
