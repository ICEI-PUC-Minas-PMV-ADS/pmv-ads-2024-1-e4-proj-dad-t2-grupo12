package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.RegistroPontoClient;
import br.puc.novaapicontroller.dto.JwtPayload;
import br.puc.novaapicontroller.dto.registroponto.PontoDto;
import br.puc.novaapicontroller.util.JWTUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RegistroPontoService {

    private final RegistroPontoClient registroPontoClient;

    public List<PontoDto> obterListagemRegistroPontos() {
        return registroPontoClient.obterListagemRegistroPontos();
    }

    public PontoDto obterRegistroPonto(String token) throws Exception {
        JwtPayload usuarioId = JWTUtil.decodeJwt(token);

        if (usuarioId != null) {
            return registroPontoClient.obterRegistros(usuarioId.getNameid());
        }

        throw new Exception("Não foi possível obter dados do usuário");
    }

    public PontoDto registrarPonto(PontoDto pontoDto) throws JsonProcessingException {
        return registroPontoClient.registrarPonto(pontoDto);
    }

    public PontoDto editarRegistroPonto(String id, PontoDto pontoDto) throws JsonProcessingException {
        return registroPontoClient.editarRegistroPonto(id, pontoDto);
    }

    public PontoDto removerPonto(String id) throws JsonProcessingException {
        return registroPontoClient.removerPonto(id);
    }

}
