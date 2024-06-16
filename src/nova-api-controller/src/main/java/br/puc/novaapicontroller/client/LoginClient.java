package br.puc.novaapicontroller.client;

import br.puc.novaapicontroller.dto.EmailVerificacaoResponse;
import br.puc.novaapicontroller.dto.Login.LoginRequest;
import br.puc.novaapicontroller.dto.Login.LoginResponse;
import br.puc.novaapicontroller.util.ClientUtil;
import br.puc.novaapicontroller.util.LogUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
@RequiredArgsConstructor
public class LoginClient {

    @Value("${usuario-ponto-url}")
    private String url;

    private final OkHttpClient okHttpClient = new OkHttpClient();

    private static final Logger logger = Logger.getLogger(UsuarioPontoClient.class.getName());

    private final ObjectMapper objectMapper = new ObjectMapper();

    public LoginResponse logar(LoginRequest request) throws JsonProcessingException {
        String erroPadrao = "Erro ao logar ";

        String corpo = objectMapper.writeValueAsString(request);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPost("/authenticate", corpoRequisicao);

        return executarRequisicaoLogin(erroPadrao, requisicao);
    }

    public EmailVerificacaoResponse verificarSeEmailExiste(String email) {
        String erroPadrao = "Erro ao verificar email. ";
        Request requisicao = construirRequisicaoGet("/check-email-exists/" + email);
        return executarRequisicaoVerificarEmail(erroPadrao, requisicao);
    }

    @Nullable
    private LoginResponse executarRequisicaoLogin(String erroPadrao, Request requisicao) {
        try (Response resposta = ClientUtil.obterClient(okHttpClient).newCall(requisicao).execute()) {
            if (resposta.isSuccessful() && resposta.body() != null) {
                String corpoResposta = resposta.body().string();
                if (!corpoResposta.trim().isEmpty()) {
                    return objectMapper.readValue(corpoResposta, LoginResponse.class);
                }
            }
        } catch (IOException e) {
            String erro = erroPadrao + ". Erro: " + e.getMessage();
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "LoginClient.java");
            return null;
        }

        logger.log(Level.SEVERE, erroPadrao);
        return null;
    }

    @Nullable
    private EmailVerificacaoResponse executarRequisicaoVerificarEmail(String erroPadrao, Request requisicao) {
        try (Response resposta = ClientUtil.obterClient(okHttpClient).newCall(requisicao).execute()) {
            if (resposta.isSuccessful() && resposta.body() != null) {
                String corpoResposta = resposta.body().string();
                if (!corpoResposta.trim().isEmpty()) {
                    return objectMapper.readValue(corpoResposta, EmailVerificacaoResponse.class);
                }
            }
        } catch (IOException e) {
            String erro = erroPadrao + ". Erro: " + e.getMessage();
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "LoginClient.java");
            return null;
        }

        logger.log(Level.SEVERE, erroPadrao);
        return null;
    }

    private Request construirRequisicaoPost(String urlComplemento, RequestBody corpoRequisicao) {
        return new Request.Builder()
                .url(url + urlComplemento)
                .post(corpoRequisicao)
                .build();
    }

    private Request construirRequisicaoGet(String urlComplemento) {
        return new Request.Builder()
                .url(url + urlComplemento)
                .get()
                .build();
    }
}
