package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.RegistroPontoClient;
import br.puc.novaapicontroller.dto.registroponto.PontoDto;
import br.puc.novaapicontroller.util.DateUtil;
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

    public PontoDto obterRegistroPonto(String registroId) throws Exception {
        return registroPontoClient.obterRegistros(registroId);
    }

    public PontoDto registrarPonto(PontoDto pontoDto) throws Exception {
        pontoDto.setDataRegistro(DateUtil.formatarDataISO(pontoDto.dataRegistro));
        return registroPontoClient.registrarPonto(pontoDto);
    }

    public PontoDto editarRegistroPonto(String id, PontoDto pontoDto) throws Exception {
        return registroPontoClient.editarRegistroPonto(id, pontoDto);
    }

    public PontoDto removerPonto(String id) throws Exception {
        return registroPontoClient.removerPonto(id);
    }

}
