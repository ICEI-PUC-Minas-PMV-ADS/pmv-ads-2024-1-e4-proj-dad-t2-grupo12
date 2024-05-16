package br.puc.novaapicontroller.client;

import br.puc.novaapicontroller.dto.CadastroUsuarioDto;
import br.puc.novaapicontroller.dto.usuario.UsuarioDto;
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
public class UsuarioPontoClient {

    @Value("${usuario-ponto.url}")
    private String url;

    private final OkHttpClient okHttpClient = new OkHttpClient();

    private static final Logger logger = Logger.getLogger(UsuarioPontoClient.class.getName());

    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<UsuarioDto> obterListaUsarios() {
        String erroPadrao = "Erro ao buscar lista de usuarios ";
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
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "UsuarioPontoClient.java");
            return null;
        }

        logger.log(Level.SEVERE, erroPadrao);
        return null;
    }

    public UsuarioDto obterUsario(String id) {
        String erroPadrao = "Erro ao buscar usuario ";
        Request requisicao = construirRequisicaoGet(id);

        return executarRequisicao(erroPadrao, requisicao);
    }

    public UsuarioDto cadastrarUsuario(CadastroUsuarioDto cadastroUsuario) throws JsonProcessingException {
        String erroPadrao = "Erro ao cadastrar usuario ";

        String corpo = objectMapper.writeValueAsString(cadastroUsuario);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPost("", corpoRequisicao);

        return executarRequisicao(erroPadrao, requisicao);
    }

    public UsuarioDto editarUsuario(String id, UsuarioDto usuario) throws JsonProcessingException {
        String erroPadrao = "Erro ao editar usuario ";

        String corpo = objectMapper.writeValueAsString(usuario);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPut(id, corpoRequisicao);

        return executarRequisicao(erroPadrao, requisicao);
    }

    public UsuarioDto removerUsuario(String id) {
        String erroPadrao = "Erro ao editar usuario ";

        Request requisicao = construirRequisicaoDelete(id);

        return executarRequisicao(erroPadrao, requisicao);
    }

    @Nullable
    private UsuarioDto executarRequisicao(String erroPadrao, Request requisicao) {
        try (Response resposta = ClientUtil.obterClient(okHttpClient).newCall(requisicao).execute()) {
            if (resposta.isSuccessful() && resposta.body() != null) {
                String corpoResposta = resposta.body().string();
                if (!corpoResposta.trim().isEmpty()) {
                    return objectMapper.readValue(corpoResposta, UsuarioDto.class);
                }
            }
        } catch (IOException e) {
            String erro = erroPadrao + ". Erro: " + e.getMessage();
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "UsuarioPontoClient.java");
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
