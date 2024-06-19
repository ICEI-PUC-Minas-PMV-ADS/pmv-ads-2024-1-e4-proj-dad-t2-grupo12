package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.LoginClient;
import br.puc.novaapicontroller.dto.EmailVerificacaoResponse;
import br.puc.novaapicontroller.dto.Login.LoginRequest;
import br.puc.novaapicontroller.dto.Login.LoginResponse;
import br.puc.novaapicontroller.dto.Login.LoginSiteResponse;
import br.puc.novaapicontroller.dto.usuario.AlteracaoSenhaRetorno;
import br.puc.novaapicontroller.dto.usuario.UsuarioDto;
import br.puc.novaapicontroller.util.CriptografiaUtil;
import br.puc.novaapicontroller.util.LogUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final LoginClient loginClient;

    private final UsuarioPontoService usuarioService;

    public LoginSiteResponse logar(LoginRequest request) {
        try {
            LoginSiteResponse loginSiteResponse = new LoginSiteResponse();
            LoginResponse response = loginClient.logar(request);

            if (response != null) {
                loginSiteResponse.setEmail(response.getEmail());
                loginSiteResponse.setSalario(response.getSalario());
                loginSiteResponse.setEndereco(response.getEndereco());
                loginSiteResponse.setJwtToken(response.getJwtToken());
                loginSiteResponse.setSetores(response.getSetores());
                loginSiteResponse.setDataNacimento(response.getDataNacimento());
                loginSiteResponse.setMensagem("Login realizado com sucesso");

                int matricula = CriptografiaUtil.gerarHashPeloObjeto(response.getId(), response.getEmail());
                loginSiteResponse.setMatricula(matricula);
            } else {
                loginSiteResponse.setMensagem("Login não encontrado. Cadastre-se ou procure a gerência");
            }

            return loginSiteResponse;
        } catch (
                IOException e) {
            String erro = "Erro ao realizar login. Erro: " + e.getMessage();
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "LoginService.java");
            return null;
        }

    }

    public EmailVerificacaoResponse verificarSeEmailJaCadastrado(String email) {
        return loginClient.verificarSeEmailExiste(email);
    }

    public LoginSiteResponse loginAdmin(LoginRequest request) {
        LoginSiteResponse loginSiteResponse = new LoginSiteResponse();
        List<UsuarioDto> usuarioDtos = usuarioService.obterListaUsarios();
        UsuarioDto usuario = usuarioDtos.stream().filter(usuarioDto -> usuarioDto.getEmail().equalsIgnoreCase(request.getEmail())).findFirst().orElse(null);

        if (usuario != null) {
            if (usuario.isUsuarioAdmin()) {
                loginSiteResponse = logar(request);
            } else {
                loginSiteResponse.setMensagem("Este usuário não tem permissão para acessar");
            }
        } else {
            loginSiteResponse.setMensagem("Login não encontrado. Cadastre-se ou procure a gerência");
        }

        return loginSiteResponse;
    }

}
