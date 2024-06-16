package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.SetorClient;
import br.puc.novaapicontroller.dto.usuario.SetorDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SetorService {

    private final SetorClient client;

    public List<SetorDto> obterListagem() throws Exception {
        return client.obterListagem();
    }

    public SetorDto obterSetor(String setorId) throws Exception {
        return client.obterSetor(setorId);
    }

    public SetorDto registrarSetor(SetorDto solicitacaoDto) throws Exception {
        return client.registrarSetor(solicitacaoDto);
    }

    public SetorDto editarSetor(String id, SetorDto solicitacaoDto) throws Exception {
        return client.editarSetor(id, solicitacaoDto);
    }

    public SetorDto removerSetor(String id) throws Exception {
        return client.removerSetor(id);
    }
    
}
