package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.LoginClient;
import br.puc.novaapicontroller.dto.Login.LoginRequest;
import br.puc.novaapicontroller.dto.Login.LoginResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final LoginClient loginClient;

    public LoginResponse logar(LoginRequest request) throws JsonProcessingException {
        return loginClient.logar(request);
    }


}
