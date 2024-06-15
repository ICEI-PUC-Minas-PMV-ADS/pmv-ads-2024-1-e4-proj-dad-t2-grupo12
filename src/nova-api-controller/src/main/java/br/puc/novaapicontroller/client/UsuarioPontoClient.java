package br.puc.novaapicontroller.client;

import br.puc.novaapicontroller.dto.AlteracaoSenhaDto;
import br.puc.novaapicontroller.dto.usuario.CadastroUsuarioDto;
import br.puc.novaapicontroller.dto.usuario.AlteracaoSenhaRetorno;
import br.puc.novaapicontroller.dto.usuario.CadastroUsuarioResponse;
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

    @Value("${usuario-ponto-url}")
    private String url;

    private final OkHttpClient okHttpClient = new OkHttpClient();

    private static final Logger LOGGER = Logger.getLogger(UsuarioPontoClient.class.getName());

    private final ObjectMapper objectMapper = new ObjectMapper();

    public List<UsuarioDto> obterListaUsarios() {
        String erroPadrao = "Erro ao buscar lista de usuarios ";
        Request requisicao = construirRequisicaoGet("", "", "");

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

        LOGGER.log(Level.SEVERE, erroPadrao);
        return null;
    }

    public UsuarioDto obterUsario(String id, String token ) {
        String erroPadrao = "Erro ao buscar usuario ";
        Request requisicao = construirRequisicaoGet("/" + id, "Authorization", token);

        return executarRequisicao(erroPadrao, requisicao);
    }

    public CadastroUsuarioResponse cadastrarUsuario(CadastroUsuarioDto cadastroUsuario) throws JsonProcessingException {
        String erroPadrao = "Erro ao cadastrar usuario ";

        String corpo = objectMapper.writeValueAsString(cadastroUsuario);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPost("", corpoRequisicao);

        return executarRequisicaoCriar(erroPadrao, requisicao);
    }

    public UsuarioDto editarUsuario(String id, UsuarioDto usuario, String token) throws JsonProcessingException {
        String erroPadrao = "Erro ao editar usuario ";

        String corpo = objectMapper.writeValueAsString(usuario);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPut("/" + id, corpoRequisicao, token);

        return executarRequisicao(erroPadrao, requisicao);
    }

    public UsuarioDto removerUsuario(String id) {
        String erroPadrao = "Erro ao remover usuario ";

        Request requisicao = construirRequisicaoDelete("/" + id);

        return executarRequisicao(erroPadrao, requisicao);
    }

    public AlteracaoSenhaRetorno alterarSenha(String id, String token, AlteracaoSenhaDto novaSenha) throws JsonProcessingException {
        String erroPadrao = "Erro ao alterar senha do usuario ";

        String corpo = objectMapper.writeValueAsString(novaSenha);
        RequestBody corpoRequisicao = ClientUtil.converterCorpoRequisicao(corpo);
        Request requisicao = construirRequisicaoPut("/change-password/"+ id, corpoRequisicao, token);

        return executarRequisicaoAlterarSenha(erroPadrao, requisicao);
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
        LOGGER.log(Level.SEVERE, erroPadrao);
        return null;
    }

    @Nullable
    private CadastroUsuarioResponse executarRequisicaoCriar(String erroPadrao, Request requisicao) {
        try (Response resposta = ClientUtil.obterClient(okHttpClient).newCall(requisicao).execute()) {
            if (resposta.isSuccessful() && resposta.body() != null) {
                String corpoResposta = resposta.body().string();
                if (!corpoResposta.trim().isEmpty()) {
                    return objectMapper.readValue(corpoResposta, CadastroUsuarioResponse.class);
                }
            } else {
                LOGGER.log(Level.SEVERE, erroPadrao + "- Status: " + resposta.code());
                return null;
            }
        } catch (IOException e) {
            String erro = erroPadrao + ". Erro: " + e.getMessage();
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "UsuarioPontoClient.java");
            return null;
        }

        LOGGER.log(Level.SEVERE, erroPadrao);
        return null;
    }

    @Nullable
    private AlteracaoSenhaRetorno executarRequisicaoAlterarSenha(String erroPadrao, Request requisicao) {
        try (Response resposta = ClientUtil.obterClient(okHttpClient).newCall(requisicao).execute()) {
            if (resposta.isSuccessful() && resposta.body() != null) {
                String corpoResposta = resposta.body().string();
                if (!corpoResposta.trim().isEmpty()) {
                    return objectMapper.readValue(corpoResposta, AlteracaoSenhaRetorno.class);
                }
            }
        } catch (IOException e) {
            String erro = erroPadrao + ". Erro: " + e.getMessage();
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "UsuarioPontoClient.java");
            return null;
        }

        LOGGER.log(Level.SEVERE, erroPadrao);
        return null;
    }

    private Request construirRequisicaoGet(String urlComplemento, String headerNome, String headerValor) {
        if (headerNome.equalsIgnoreCase("")) {
            return new Request.Builder()
                    .url(url + urlComplemento)
                    .get()
                    .build();
        } else {
            return new Request.Builder()
                    .url(url + urlComplemento)
                    .header(headerNome, headerValor)
                    .get()
                    .build();
        }

    }

    private Request construirRequisicaoPost(String urlComplemento, RequestBody corpoRequisicao) {
        return new Request.Builder()
                .url(url + urlComplemento)
                .post(corpoRequisicao)
                .build();
    }

    private Request construirRequisicaoPut(String urlComplemento, RequestBody corpoRequisicao, String token) {
        return new Request.Builder()
                .url(url + urlComplemento)
                .header("Authorization", token)
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
