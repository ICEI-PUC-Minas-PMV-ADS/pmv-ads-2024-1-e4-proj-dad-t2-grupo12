package br.puc.novaapicontroller.util;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.RequestBody;

import java.util.concurrent.TimeUnit;

public class ClientUtil {

    public static RequestBody converterCorpoRequisicao(String corpo) {
        MediaType mediaType = MediaType.parse("application/json; charset=utf-8");
        return RequestBody.create(corpo, mediaType);
    }

    public static OkHttpClient obterClient(OkHttpClient okHttpClient) {
        OkHttpClient.Builder builder = okHttpClient.newBuilder()
                .readTimeout(60, TimeUnit.SECONDS)
                .writeTimeout(60, TimeUnit.SECONDS)
                .callTimeout(60, TimeUnit.SECONDS);
        return builder.build();
    }

}
