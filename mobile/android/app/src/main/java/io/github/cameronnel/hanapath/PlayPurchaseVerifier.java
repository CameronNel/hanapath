package io.github.cameronnel.hanapath;

import java.nio.charset.StandardCharsets;
import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.Signature;
import java.security.spec.X509EncodedKeySpec;

final class PlayPurchaseVerifier {
    private PlayPurchaseVerifier() {}

    static boolean verify(byte[] encodedPublicKey, String signedData, byte[] encodedSignature) {
        if (encodedPublicKey == null || encodedPublicKey.length == 0
            || signedData == null || encodedSignature == null || encodedSignature.length == 0) {
            return false;
        }
        try {
            PublicKey key = KeyFactory.getInstance("RSA")
                .generatePublic(new X509EncodedKeySpec(encodedPublicKey));
            Signature signature = Signature.getInstance("SHA1withRSA");
            signature.initVerify(key);
            signature.update(signedData.getBytes(StandardCharsets.UTF_8));
            return signature.verify(encodedSignature);
        } catch (Exception ignored) {
            return false;
        }
    }
}
