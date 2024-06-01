package br.puc.novaapicontroller.util;

import br.puc.novaapicontroller.dto.JwtPayload;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Base64;

public class JWTUtil {

    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    public static JwtPayload decodeJwt(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        try {
            String[] chunks = token.split("\\.");
            Base64.Decoder decoder = Base64.getUrlDecoder();
            String tokenPaylodString = new String(decoder.decode(chunks[1]));
            return OBJECT_MAPPER.readValue(tokenPaylodString, JwtPayload.class);

        } catch (Exception e) {
            System.out.println("Erro ao decodificar o token: " + e.getMessage());
            return null;
        }
    }

}
