package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.RegistroPontoClient;
import br.puc.novaapicontroller.dto.registroponto.PontoDto;
import br.puc.novaapicontroller.dto.usuario.UsuarioDto;
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

    public PontoDto obterRegistroPonto(String id) {
        return registroPontoClient.obterRegistroPonto(id);
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
