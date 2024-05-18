package br.puc.novaapicontroller.controller;

import br.puc.novaapicontroller.dto.registroponto.PontoDto;
import br.puc.novaapicontroller.service.RegistroPontoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/public/registroponto")
@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
public class RegistroPontoController {

    private final RegistroPontoService service;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterListagemRegistroPontos() {
        return ResponseEntity.ok(service.obterListagemRegistroPontos());
    }

    //    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> obterRegistroPonto() {
//        return ResponseEntity.ok(service.obterRegistroPonto());
//    }
//
    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registrarPonto(@RequestBody PontoDto pontoDto) throws JsonProcessingException {
        return ResponseEntity.ok(service.registrarPonto(pontoDto));
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editarRegistroPonto(@PathVariable String id, @RequestBody PontoDto pontoDto) throws JsonProcessingException {
        return ResponseEntity.ok(service.editarRegistroPonto(id, pontoDto));
    }

    @DeleteMapping (value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> removerPonto(@PathVariable String id) throws JsonProcessingException {
        return ResponseEntity.ok(service.removerPonto(id));
    }


}
