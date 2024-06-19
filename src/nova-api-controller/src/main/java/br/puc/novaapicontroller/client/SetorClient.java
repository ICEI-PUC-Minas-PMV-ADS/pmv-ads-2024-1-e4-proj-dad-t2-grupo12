package br.puc.novaapicontroller.client;

import br.puc.novaapicontroller.dto.usuario.SetorDto;
import br.puc.novaapicontroller.util.ClientUtil;
import br.puc.novaapicontroller.util.LogUtil;
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

import static br.puc.novaapicontroller.util.ClientUtil.*;

@Component
@RequiredArgsConstructor
public class SetorClient {

    @Value("${usuario-ponto-setor-url}")
    private String url;

    private final OkHttpClient okHttpClient = new OkHttpClient();

    private static final Logger logger = Logger.getLogger(UsuarioPontoClient.class.getName());

    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<SetorDto> obterListagem() throws Exception {
        String erroPadrao = "Erro ao buscar listagem de setor";
        Request requisicao = construirRequisicaoGet(url);

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
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "SetorClient.java");
            return null;
        }

        logger.log(Level.SEVERE, erroPadrao);
        return null;
    }

    public SetorDto obterSetor(String id) throws Exception {
        String erroPadrao = "Erro ao setor";
        Request requisicao = construirRequisicaoGet(url + id);

        return executarRequisicaoSetor(erroPadrao, requisicao);
    }

    public SetorDto registrarSetor(SetorDto setorDto) throws Exception {
        String erroPadrao = "Erro ao registrar setor";

        String corpo = objectMapper.writeValueAsString(setorDto);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPost(url, corpoRequisicao);

        return executarRequisicaoSetor(erroPadrao, requisicao);
    }

    public SetorDto editarSetor(String id, SetorDto setorDto) throws Exception {
        String erroPadrao = "Erro ao editar setor";

        String corpo = objectMapper.writeValueAsString(setorDto);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPut(url + id, corpoRequisicao);
        executarRequisicaoSetor(erroPadrao, requisicao);
        return setorDto;
    }

    public SetorDto removerSetor(String id) throws Exception {
        String erroPadrao = "Erro ao remover setor";
        Request requisicao = construirRequisicaoDelete(url + id);
        return executarRequisicaoSetor(erroPadrao, requisicao);
    }

    @Nullable
    private SetorDto executarRequisicaoSetor(String erroPadrao, Request requisicao) throws Exception {
        String erroRequisicao = "Erro ao fazer requisição. ";

        try (Response resposta = ClientUtil.obterClient(okHttpClient).newCall(requisicao).execute()) {
            if (resposta.body() != null) {
                String corpoResposta = resposta.body().string();
                if (resposta.isSuccessful()) {
                    if (!corpoResposta.trim().isEmpty()) {
                        return objectMapper.readValue(corpoResposta, SetorDto.class);
                    } else {
                        return null;

                    }
                } else {
                    erroRequisicao = erroRequisicao + erroPadrao + ": " + resposta.code() + ". Resposta: " + corpoResposta;
                }
            } else {
                erroRequisicao = erroRequisicao + erroPadrao + ": " + resposta.code();
            }

            logger.log(Level.SEVERE, erroRequisicao);
            throw new Exception(erroRequisicao);

        } catch (Exception e) {
            String erro = erroPadrao + ". Erro: " + e.getMessage();
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "SetorClient.java");
            throw new Exception(erroRequisicao);
        }
    }
}
