package io.github.cameronnel.hanapath;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.nio.charset.StandardCharsets;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.Signature;

import org.junit.Test;

public class PlayPurchaseVerifierTest {
    @Test
    public void acceptsMatchingSignedPurchaseAndRejectsTampering() throws Exception {
        KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
        generator.initialize(2048);
        KeyPair pair = generator.generateKeyPair();
        String purchaseJson = "{\"productId\":\"hanapath_ad_free_monthly\"}";

        Signature signer = Signature.getInstance("SHA1withRSA");
        signer.initSign(pair.getPrivate());
        signer.update(purchaseJson.getBytes(StandardCharsets.UTF_8));
        byte[] signature = signer.sign();

        assertTrue(PlayPurchaseVerifier.verify(pair.getPublic().getEncoded(), purchaseJson, signature));
        assertFalse(PlayPurchaseVerifier.verify(pair.getPublic().getEncoded(), purchaseJson + "x", signature));
        assertFalse(PlayPurchaseVerifier.verify(new byte[0], purchaseJson, signature));
    }
}
