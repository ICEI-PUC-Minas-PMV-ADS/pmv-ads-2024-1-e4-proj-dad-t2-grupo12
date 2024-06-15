package br.puc.novaapicontroller.client;

import br.puc.novaapicontroller.dto.registroponto.HoleriteDto;
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
public class HoleriteClient {

    @Value("${holerite-ponto-url}")
    private String url;

    private final OkHttpClient okHttpClient = new OkHttpClient();

    private static final Logger logger = Logger.getLogger(SolicitacaoAlteracaoClient.class.getName());

    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<HoleriteDto> obterListagemHolerite() throws Exception {
        String erroPadrao = "Erro ao buscar listagem de holerite";
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
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "HoleriteClient.java");
            return null;
        }

        logger.log(Level.SEVERE, erroPadrao);
        return null;
    }

    public HoleriteDto obterHolerite(String id) throws Exception {
        String erroPadrao = "Erro ao holerite";
        Request requisicao = construirRequisicaoGet(url + id);

        return executarRequisicaoHolerite(erroPadrao, requisicao);
    }

    public HoleriteDto registrarHolerite(HoleriteDto holeriteDto) throws Exception {
        String erroPadrao = "Erro ao registrar holerite";

        String corpo = objectMapper.writeValueAsString(holeriteDto);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPost(url, corpoRequisicao);

        return executarRequisicaoHolerite(erroPadrao, requisicao);
    }

    public HoleriteDto editarHolerite(String id, HoleriteDto holeriteDto) throws Exception {
        String erroPadrao = "Erro ao editar holerite";

        String corpo = objectMapper.writeValueAsString(holeriteDto);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPut(url + id, corpoRequisicao);
        executarRequisicaoHolerite(erroPadrao, requisicao);
        return holeriteDto;
    }

    public HoleriteDto removerHolerite(String id) throws Exception {
        String erroPadrao = "Erro ao remover holerite";

        Request requisicao = construirRequisicaoDelete(url + id);

        return executarRequisicaoHolerite(erroPadrao, requisicao);
    }

    @Nullable
    private HoleriteDto executarRequisicaoHolerite(String erroPadrao, Request requisicao) throws Exception {
        String erroRequisicao = "Erro ao fazer requisição. ";

        try (Response resposta = ClientUtil.obterClient(okHttpClient).newCall(requisicao).execute()) {
            if (resposta.body() != null) {
                String corpoResposta = resposta.body().string();
                if (resposta.isSuccessful()) {
                    if (!corpoResposta.trim().isEmpty()) {
                        return objectMapper.readValue(corpoResposta, HoleriteDto.class);
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
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "HoleriteClient.java");
            throw new Exception(erroRequisicao);
        }
    }
}
