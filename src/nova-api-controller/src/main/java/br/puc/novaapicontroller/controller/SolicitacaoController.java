package br.puc.novaapicontroller.controller;

import br.puc.novaapicontroller.dto.registroponto.SolicitacaoDto;
import br.puc.novaapicontroller.service.SolicitacaoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/public/solicitacao")
public class SolicitacaoController {

    private final SolicitacaoService service;

    @GetMapping(value = "/listar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterListagemSolicitacoes() throws Exception {
        return ResponseEntity.ok(service.obterRegistrosAlteracaoListagem());
    }

    @GetMapping(value = "/{solicitacaoId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterSolicitacaoAlteracao(@PathVariable String solicitacaoId) {
        try {
            return ResponseEntity.ok(service.obterRegistroAlteracao(solicitacaoId));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @GetMapping(value = "registro/{registroId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterSolicitacaoAlteracaoPeloRegistro(@PathVariable String registroId) {
        try {
            return ResponseEntity.ok(service.obterSolicitacaoAlteracaoPeloRegistro(registroId));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registrarSolicitacaoAlteracao(@RequestBody SolicitacaoDto solicitacaoDto) throws JsonProcessingException {
        try {
            return ResponseEntity.ok(service.registrarSolicitacaoAlteracao(solicitacaoDto));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editarSolicitacaoAlteracao(@PathVariable String id, @RequestBody SolicitacaoDto solicitacaoDto) throws Exception {
        try {
            return ResponseEntity.ok(service.editarSolicitacaoAlteracaoPonto(id, solicitacaoDto));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> removerSolicitacao(@PathVariable String id) throws Exception {
        return ResponseEntity.ok(service.removerSolicitacaoAlteracaoPonto(id));
    }

}
