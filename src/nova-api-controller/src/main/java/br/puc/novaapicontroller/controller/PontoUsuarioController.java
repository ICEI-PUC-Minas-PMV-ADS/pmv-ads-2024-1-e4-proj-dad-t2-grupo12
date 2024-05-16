package br.puc.novaapicontroller.controller;

import br.puc.novaapicontroller.dto.CadastroUsuarioDto;
import br.puc.novaapicontroller.dto.usuario.UsuarioDto;
import br.puc.novaapicontroller.service.UsuarioPontoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/public/usuario")
public class PontoUsuarioController {

    private final UsuarioPontoService service;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterListaUsuarios() {
        return ResponseEntity.ok(service.obterListaUsarios());
    }

//    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> obterUsuario() {
//        return ResponseEntity.ok(service.obterUsario());
//    }
//
    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> cadastrarUsuario(@RequestBody CadastroUsuarioDto cadastro) throws JsonProcessingException {
        return ResponseEntity.ok(service.cadastrarUsuario(cadastro));
    }

    @PutMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editarUsuario(@PathVariable String id, @RequestBody UsuarioDto usuario) throws JsonProcessingException {
        return ResponseEntity.ok(service.editarUsuario(id, usuario));
    }

    @DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> removerUsuario(@PathVariable String id) throws JsonProcessingException {
        return ResponseEntity.ok(service.removerUsuario(id));
    }

}
