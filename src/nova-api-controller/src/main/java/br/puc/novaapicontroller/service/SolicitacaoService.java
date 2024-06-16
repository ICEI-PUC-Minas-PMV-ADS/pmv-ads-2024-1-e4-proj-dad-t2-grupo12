package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.SolicitacaoAlteracaoClient;
import br.puc.novaapicontroller.dto.registroponto.SolicitacaoDto;
import br.puc.novaapicontroller.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SolicitacaoService {

    private final SolicitacaoAlteracaoClient alteracaoClient;

    public List<SolicitacaoDto> obterRegistrosAlteracaoListagem() throws Exception {
        return alteracaoClient.obterRegistrosAlteracaoListagem();
    }

    public SolicitacaoDto obterRegistroAlteracao(String solicitacaoId) throws Exception {
        return alteracaoClient.obterRegistroAlteracao(solicitacaoId);
    }

    public SolicitacaoDto obterSolicitacaoAlteracaoPeloRegistro(String registroId) throws Exception {
        List<SolicitacaoDto> solicitacoesList = obterRegistrosAlteracaoListagem();
        return solicitacoesList.stream().filter(solicitacao -> solicitacao.getPontoId().equalsIgnoreCase(registroId)).findFirst().orElse(null);
    }

    public SolicitacaoDto registrarSolicitacaoAlteracao(SolicitacaoDto solicitacaoDto) throws Exception {
        solicitacaoDto.setDataSolicitacao(DateUtil.formatarDataISO(solicitacaoDto.getDataSolicitacao()));
        return alteracaoClient.registrarSolicitacaoPonto(solicitacaoDto);
    }

    public SolicitacaoDto editarSolicitacaoAlteracaoPonto(String id, SolicitacaoDto solicitacaoDto) throws Exception {
        return alteracaoClient.editarSolicitacaoAlteracaoPonto(id, solicitacaoDto);
    }

    public SolicitacaoDto removerSolicitacaoAlteracaoPonto(String id) throws Exception {
        return alteracaoClient.removerSolicitacaoAlteracaoPonto(id);
    }
}
