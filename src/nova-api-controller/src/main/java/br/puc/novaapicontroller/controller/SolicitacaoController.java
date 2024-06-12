package br.puc.novaapicontroller.controller;

import br.puc.novaapicontroller.dto.registroponto.SolicitacaoDto;
import br.puc.novaapicontroller.service.RegistroPontoService;
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
    public ResponseEntity<?> obterListagemRegistroPontos() throws Exception {
        return ResponseEntity.ok(service.obterRegistrosAlteracaoListagem());
    }

    @GetMapping(value = "/{registroId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterRegistroPonto(@PathVariable String registroId) {
        try {
            return ResponseEntity.ok(service.obterRegistroAlteracao(registroId));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registrarPonto(@RequestBody SolicitacaoDto solicitacaoDto) throws JsonProcessingException {
        try {
            return ResponseEntity.ok(service.registrarSolicitacaoPonto(solicitacaoDto));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editarRegistroPonto(@PathVariable String id, @RequestBody SolicitacaoDto solicitacaoDto) throws Exception {
        try {
            return ResponseEntity.ok(service.editarSolicitacaoAlteracaoPonto(id, solicitacaoDto));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> removerPonto(@PathVariable String id) throws Exception {
        return ResponseEntity.ok(service.removerSolicitacaoAlteracaoPonto(id));
    }

}
