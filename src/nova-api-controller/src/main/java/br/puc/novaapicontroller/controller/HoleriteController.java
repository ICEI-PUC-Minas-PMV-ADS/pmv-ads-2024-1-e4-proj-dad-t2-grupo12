package br.puc.novaapicontroller.controller;

import br.puc.novaapicontroller.dto.registroponto.HoleriteDto;
import br.puc.novaapicontroller.service.HoleriteService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/public/holerite")
public class HoleriteController {
    
    private final HoleriteService service;

    @GetMapping(value = "/listar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterListagemRegistroPontos() throws Exception {
        return ResponseEntity.ok(service.obterListagemHolerite());
    }

    @GetMapping(value = "/{registroId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterRegistroPonto(@PathVariable String registroId) {
        try {
            return ResponseEntity.ok(service.obterHolerite(registroId));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registrarPonto(@RequestBody HoleriteDto holeriteDto) throws JsonProcessingException {
        try {
            return ResponseEntity.ok(service.registrarHolerite(holeriteDto));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editarRegistroPonto(@PathVariable String id, @RequestBody HoleriteDto holeriteDto) throws Exception {
        try {
            return ResponseEntity.ok(service.editarHolerite(id, holeriteDto));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> removerPonto(@PathVariable String id) throws Exception {
        return ResponseEntity.ok(service.removerHolerite(id));
    }
    
}
