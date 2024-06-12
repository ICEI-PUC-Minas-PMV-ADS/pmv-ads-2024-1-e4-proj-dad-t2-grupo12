package br.puc.novaapicontroller.controller;

import br.puc.novaapicontroller.dto.registroponto.PontoDto;
import br.puc.novaapicontroller.service.RegistroPontoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/public/registroponto")
public class RegistroPontoController {

    private final RegistroPontoService service;

    @GetMapping(value = "/listar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterListagemRegistroPontos() {
        return ResponseEntity.ok(service.obterListagemRegistroPontos());
    }

    @GetMapping(value = "/{registroId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterRegistroPonto(@PathVariable String registroId) {
        try {
            return ResponseEntity.ok(service.obterRegistroPonto(registroId));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registrarPonto(@RequestBody PontoDto pontoDto) throws JsonProcessingException {
        try {
            return ResponseEntity.ok(service.registrarPonto(pontoDto));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editarRegistroPonto(@PathVariable String id, @RequestBody PontoDto pontoDto) throws Exception {
        try {
            return ResponseEntity.ok(service.editarRegistroPonto(id, pontoDto));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> removerPonto(@PathVariable String id) throws Exception {
        return ResponseEntity.ok(service.removerPonto(id));
    }

}
