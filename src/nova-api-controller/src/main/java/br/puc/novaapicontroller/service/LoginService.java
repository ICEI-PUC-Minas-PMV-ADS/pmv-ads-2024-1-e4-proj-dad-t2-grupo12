package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.LoginClient;
import br.puc.novaapicontroller.dto.EmailVerificacaoResponse;
import br.puc.novaapicontroller.dto.Login.LoginRequest;
import br.puc.novaapicontroller.dto.Login.LoginResponse;
import br.puc.novaapicontroller.dto.Login.LoginSiteResponse;
import br.puc.novaapicontroller.dto.usuario.AlteracaoSenhaRetorno;
import br.puc.novaapicontroller.util.CriptografiaUtil;
import br.puc.novaapicontroller.util.LogUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final LoginClient loginClient;

    public LoginSiteResponse logar(LoginRequest request) {
        try {
            LoginResponse response = loginClient.logar(request);

            LoginSiteResponse loginSiteResponse = new LoginSiteResponse();
            loginSiteResponse.setEmail(response.getEmail());
            loginSiteResponse.setSalario(response.getSalario());
            loginSiteResponse.setEndereco(response.getEndereco());
            loginSiteResponse.setJwtToken(response.getJwtToken());
            loginSiteResponse.setSetores(response.getSetores());
            loginSiteResponse.setDataNacimento(response.getDataNacimento());

            int matricula = CriptografiaUtil.gerarHashPeloObjeto(response.getId(), response.getEmail());
            loginSiteResponse.setMatricula(matricula);

            return loginSiteResponse;
        } catch (
                IOException e) {
            String erro = "Erro ao realizar login. Erro: " + e.getMessage();
            LogUtil.buscarLinhaExcecaoEImprimirLogErro(e, erro, "LoginService.java");
            return null;
        }

    }

    public EmailVerificacaoResponse verificarSeEmailJaCadastrado(String email) throws Exception {
        return loginClient.verificarSeEmailExiste(email);
    }

}
