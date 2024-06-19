package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.HoleriteClient;
import br.puc.novaapicontroller.client.SolicitacaoAlteracaoClient;
import br.puc.novaapicontroller.dto.registroponto.HoleriteDto;
import br.puc.novaapicontroller.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HoleriteService {
    
    private final HoleriteClient client;

    public List<HoleriteDto> obterListagemHolerite() throws Exception {
        return client.obterListagemHolerite();
    }

    public HoleriteDto obterHolerite(String holeriteId) throws Exception {
        return client.obterHolerite(holeriteId);
    }

    public HoleriteDto registrarHolerite(HoleriteDto solicitacaoDto) throws Exception {
        return client.registrarHolerite(solicitacaoDto);
    }

    public HoleriteDto editarHolerite(String id, HoleriteDto solicitacaoDto) throws Exception {
        return client.editarHolerite(id, solicitacaoDto);
    }

    public HoleriteDto removerHolerite(String id) throws Exception {
        return client.removerHolerite(id);
    }
    
}
