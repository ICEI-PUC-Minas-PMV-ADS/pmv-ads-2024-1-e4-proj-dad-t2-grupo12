package br.puc.novaapicontroller.client;

import br.puc.novaapicontroller.dto.registroponto.SolicitacaoDto;
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
public class SolicitacaoAlteracaoClient {

    @Value("${altercao-ponto.url}")
    private String url;

    private final OkHttpClient okHttpClient = new OkHttpClient();

    private static final Logger logger = Logger.getLogger(SolicitacaoAlteracaoClient.class.getName());

    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<SolicitacaoDto> obterRegistrosAlteracaoListagem() throws Exception {
        String erroPadrao = "Erro ao buscar solicitacao de alteração de ponto";
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
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "SolicitacaoAlteracaoClient.java");
            return null;
        }

        logger.log(Level.SEVERE, erroPadrao);
        return null;
    }

    public SolicitacaoDto obterRegistroAlteracao(String id) throws Exception {
        String erroPadrao = "Erro ao buscar solicitacao de alteração de ponto";
        Request requisicao = construirRequisicaoGet(url + id);

        return executarRequisicaoSolicitacaoAlteracaoPonto(erroPadrao, requisicao);
    }

    public SolicitacaoDto registrarSolicitacaoPonto(SolicitacaoDto solicitacaoDto) throws Exception {
        String erroPadrao = "Erro ao registrar solicitacao de alteração de ponto";

        String corpo = objectMapper.writeValueAsString(solicitacaoDto);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPost(url, corpoRequisicao);

        return executarRequisicaoSolicitacaoAlteracaoPonto(erroPadrao, requisicao);
    }

    public SolicitacaoDto editarSolicitacaoAlteracaoPonto(String id, SolicitacaoDto solicitacaoDto) throws Exception {
        String erroPadrao = "Erro ao editar solicitacao de alteração de ponto";

        String corpo = objectMapper.writeValueAsString(solicitacaoDto);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPut(url + id, corpoRequisicao);
        executarRequisicaoSolicitacaoAlteracaoPonto(erroPadrao, requisicao);
        return solicitacaoDto;
    }

    public SolicitacaoDto removerSolicitacaoAlteracaoPonto(String id) throws Exception {
        String erroPadrao = "Erro ao remover solicitacao de alteração de ponto";

        Request requisicao = construirRequisicaoDelete(url + id);

        return executarRequisicaoSolicitacaoAlteracaoPonto(erroPadrao, requisicao);
    }

    @Nullable
    private SolicitacaoDto executarRequisicaoSolicitacaoAlteracaoPonto(String erroPadrao, Request requisicao) throws Exception {
        String erroRequisicao = "Erro ao fazer requisição. ";

        try (Response resposta = ClientUtil.obterClient(okHttpClient).newCall(requisicao).execute()) {
            if (resposta.body() != null) {
                String corpoResposta = resposta.body().string();
                if (resposta.isSuccessful()) {
                    if (!corpoResposta.trim().isEmpty()) {
                        return objectMapper.readValue(corpoResposta, SolicitacaoDto.class);
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
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "SolicitacaoAlteracaoClient.java");
            throw new Exception(erroRequisicao);
        }
    }
    
}
