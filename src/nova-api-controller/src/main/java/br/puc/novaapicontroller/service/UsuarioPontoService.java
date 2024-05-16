package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.UsuarioPontoClient;
import br.puc.novaapicontroller.dto.CadastroUsuarioDto;
import br.puc.novaapicontroller.dto.usuario.UsuarioDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioPontoService {

    private final UsuarioPontoClient usuarioClient;

    public List<UsuarioDto> obterListaUsarios() {
        return usuarioClient.obterListaUsarios();
    }

    public UsuarioDto obterUsario(String id) {
        return usuarioClient.obterUsario(id);

    }

    public UsuarioDto cadastrarUsuario(CadastroUsuarioDto cadastroUsuario) throws JsonProcessingException {
        return usuarioClient.cadastrarUsuario(cadastroUsuario);

    }

    public UsuarioDto editarUsuario(String id, UsuarioDto usuario) throws JsonProcessingException {
        return usuarioClient.editarUsuario(id, usuario);
    }

    public UsuarioDto removerUsuario(String id) throws JsonProcessingException {
        return usuarioClient.removerUsuario(id);
    }

}
