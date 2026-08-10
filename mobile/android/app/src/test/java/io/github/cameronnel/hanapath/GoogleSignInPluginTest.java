package io.github.cameronnel.hanapath;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class GoogleSignInPluginTest {
    @Test
    public void missingClientIdIsNotConfigured() {
        assertFalse(GoogleSignInPlugin.isConfiguredServerClientId(null));
        assertFalse(GoogleSignInPlugin.isConfiguredServerClientId(""));
        assertFalse(GoogleSignInPlugin.isConfiguredServerClientId("   "));
    }

    @Test
    public void ownerClientIdIsConfiguredAfterTrimming() {
        String clientId = "123456789-example.apps.googleusercontent.com";
        assertTrue(GoogleSignInPlugin.isConfiguredServerClientId("  " + clientId + "  "));
        assertEquals(clientId, GoogleSignInPlugin.normalizeServerClientId("  " + clientId + "  "));
    }
}
