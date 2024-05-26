package br.puc.novaapicontroller.client;

import br.puc.novaapicontroller.dto.registroponto.PontoDto;
import br.puc.novaapicontroller.util.ClientUtil;
import br.puc.novaapicontroller.util.LogUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
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
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
@RequiredArgsConstructor
public class RegistroPontoClient {

    @Value("${registro-ponto.url}")
    private String url;

    private final OkHttpClient okHttpClient = new OkHttpClient();

    private static final Logger logger = Logger.getLogger(RegistroPontoClient.class.getName());

    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<PontoDto> obterListagemRegistroPontos() {
        String erroPadrao = "Erro ao buscar listagem de registro de pontos ";
        Request requisicao = construirRequisicaoGet("");

        try (Response resposta = ClientUtil.obterClient(okHttpClient).newCall(requisicao).execute()) {
            if (resposta.isSuccessful() && resposta.body() != null) {
                String corpoResposta = resposta.body().string();
                if (!corpoResposta.trim().isEmpty()) {
                    return objectMapper.readValue(corpoResposta, new TypeReference<>() {
                    });
                }
            }
        } catch (IOException e) {
            String erro = erroPadrao + ". Erro: " + e.getMessage();
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "RegistroPontoClient.java");
            return null;
        }

        logger.log(Level.SEVERE, erroPadrao);
        return null;
    }

    public PontoDto obterRegistros(String id) {
        String erroPadrao = "Erro ao buscar registro de ponto";
        Request requisicao = construirRequisicaoGet(id);

        return executarRequisicaoPonto(erroPadrao, requisicao);
    }

    public PontoDto registrarPonto(PontoDto pontoDto) throws JsonProcessingException {
        String erroPadrao = "Erro ao registrar ponto ";

        String corpo = objectMapper.writeValueAsString(pontoDto);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPost("", corpoRequisicao);

        return executarRequisicaoPonto(erroPadrao, requisicao);
    }

    public PontoDto editarRegistroPonto(String id, PontoDto pontoDto) throws JsonProcessingException {
        String erroPadrao = "Erro ao editar registro de ponto ";

        String corpo = objectMapper.writeValueAsString(pontoDto);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPut(id, corpoRequisicao);

        return executarRequisicaoPonto(erroPadrao, requisicao);
    }

    public PontoDto removerPonto(String id) throws JsonProcessingException {
        String erroPadrao = "Erro ao remover registro de ponto ";

        Request requisicao = construirRequisicaoDelete(id);

        return executarRequisicaoPonto(erroPadrao, requisicao);
    }

    @Nullable
    private PontoDto executarRequisicaoPonto(String erroPadrao, Request requisicao) {
        try (Response resposta = ClientUtil.obterClient(okHttpClient).newCall(requisicao).execute()) {
            if (resposta.isSuccessful() && resposta.body() != null) {
                String corpoResposta = resposta.body().string();
                if (!corpoResposta.trim().isEmpty()) {
                    return objectMapper.readValue(corpoResposta, PontoDto.class);
                }
            } else {
                String erro = "Erro ao fazer requisição. " + erroPadrao + ": " + resposta.code();
                logger.log(Level.SEVERE, erro);
                throw new Exception(erro);
            }
        } catch (Exception e) {
            String erro = erroPadrao + ". Erro: " + e.getMessage();
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "RegistroPontoClient.java");
            return null;
        }

        logger.log(Level.SEVERE, erroPadrao);
        return null;
    }

    private Request construirRequisicaoGet(String urlComplemento) {
        return new Request.Builder()
                .url(url + urlComplemento)
                .get()
                .build();
    }

    private Request construirRequisicaoPost(String urlComplemento, RequestBody corpoRequisicao) {
        return new Request.Builder()
                .url(url + urlComplemento)
                .post(corpoRequisicao)
                .build();
    }

    private Request construirRequisicaoPut(String urlComplemento, RequestBody corpoRequisicao) {
        return new Request.Builder()
                .url(url + urlComplemento)
                .put(corpoRequisicao)
                .build();
    }

    private Request construirRequisicaoDelete(String urlComplemento) {
        return new Request.Builder()
                .url(url + urlComplemento)
                .delete()
                .build();
    }
}
