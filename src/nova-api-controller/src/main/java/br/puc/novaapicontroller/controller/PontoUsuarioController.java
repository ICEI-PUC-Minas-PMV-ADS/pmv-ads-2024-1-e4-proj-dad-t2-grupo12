package br.puc.novaapicontroller.controller;

import br.puc.novaapicontroller.dto.AlteracaoSenhaDto;
import br.puc.novaapicontroller.dto.usuario.CadastroUsuarioDto;
import br.puc.novaapicontroller.dto.usuario.UsuarioDto;
import br.puc.novaapicontroller.service.UsuarioPontoService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/public/usuario")
public class PontoUsuarioController {

    private final UsuarioPontoService service;

    @GetMapping(value = "/listar", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterListaUsuarios() {
        return ResponseEntity.ok(service.obterListaUsarios());
    }

    @GetMapping(value = "/{nome}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> filtrarPorNome(@PathVariable String nome) {
        return ResponseEntity.ok(service.filtrarPorNome(nome));
    }

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> obterUsuario(HttpServletRequest requisicao) {
        String token = requisicao.getHeader("Authorization");
        try {
            return ResponseEntity.ok(service.obterUsario(token));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> cadastrarUsuario(@RequestBody CadastroUsuarioDto cadastro) {
        try {
            return ResponseEntity.ok(service.cadastrarUsuario(cadastro));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editarUsuario(@RequestBody UsuarioDto usuario, HttpServletRequest requisicao) {
        String token = requisicao.getHeader("Authorization");
        try {
            return ResponseEntity.ok(service.editarUsuario(usuario, token));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PutMapping(value = "/admin/{idUsuarioColaborador}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> editarUsuarioAdmin(@RequestBody UsuarioDto usuario, HttpServletRequest requisicao, @PathVariable String idUsuarioColaborador) {
        String token = requisicao.getHeader("Authorization");
        try {
            return ResponseEntity.ok(service.editarUsuarioAdmin(usuario, token, idUsuarioColaborador));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @PutMapping(value = "/alterarSenha", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> alterarSenha(@RequestBody AlteracaoSenhaDto novaSenha, HttpServletRequest requisicao) {
        String token = requisicao.getHeader("Authorization");
        try {
            return ResponseEntity.ok(service.alterarSenha(novaSenha, token));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

    @DeleteMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> removerUsuario(HttpServletRequest requisicao) {
        String token = requisicao.getHeader("Authorization");
        try {
            return ResponseEntity.ok(service.removerUsuario(token));
        } catch (Exception ex) {
            return ResponseEntity.status(500).body(ex.getMessage());
        }
    }

}
