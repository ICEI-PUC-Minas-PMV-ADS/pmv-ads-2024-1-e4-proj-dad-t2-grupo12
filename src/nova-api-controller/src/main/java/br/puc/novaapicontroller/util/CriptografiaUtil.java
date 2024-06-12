package br.puc.novaapicontroller.util;

import java.nio.ByteBuffer;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class CriptografiaUtil {

    public static int gerarHashPeloObjeto(String userId, String otherValue) {
        try {
            String combinedInput = userId + otherValue;
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashBytes = md.digest(combinedInput.getBytes());
            ByteBuffer buffer = ByteBuffer.wrap(hashBytes);
            return buffer.getInt();

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

}
