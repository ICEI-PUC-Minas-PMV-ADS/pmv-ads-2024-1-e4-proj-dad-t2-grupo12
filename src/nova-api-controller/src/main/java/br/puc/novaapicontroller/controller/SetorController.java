package br.puc.novaapicontroller.controller;

import br.puc.novaapicontroller.dto.usuario.SetorDto;
import br.puc.novaapicontroller.service.SetorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/public/setor")
public class SetorController {

    private final SetorService service;

    @GetMapping(value = "/listar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterListagem() throws Exception {
        return ResponseEntity.ok(service.obterListagem());
    }

    @GetMapping(value = "/{setorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterSetor(@PathVariable String setorId) {
        try {
            return ResponseEntity.ok(service.obterSetor(setorId));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> registrarSetor(@RequestBody SetorDto setorDto) {
        try {
            return ResponseEntity.ok(service.registrarSetor(setorDto));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editarSetor(@PathVariable String id, @RequestBody SetorDto setorDto) {
        try {
            return ResponseEntity.ok(service.editarSetor(id, setorDto));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> removerSetor(@PathVariable String id) throws Exception {
        return ResponseEntity.ok(service.removerSetor(id));
    }


}
