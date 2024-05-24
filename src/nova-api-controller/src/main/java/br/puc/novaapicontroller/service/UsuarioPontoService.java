package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.UsuarioPontoClient;
import br.puc.novaapicontroller.dto.CadastroUsuarioDto;
import br.puc.novaapicontroller.dto.JwtPayload;
import br.puc.novaapicontroller.dto.usuario.UsuarioDto;
import br.puc.novaapicontroller.util.JWTUtil;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioPontoService {

    private final UsuarioPontoClient usuarioClient;

    public List<UsuarioDto> obterListaUsarios() {
        return usuarioClient.obterListaUsarios();
    }

    public UsuarioDto obterUsario(String token) throws Exception {
        JwtPayload usuarioId = JWTUtil.decodeJwt(token);

        if (usuarioId != null) {
            return usuarioClient.obterUsario(usuarioId.getNameid(), token);
        }

        throw new Exception("Não foi possível obter dados do usuário");
    }

    public UsuarioDto cadastrarUsuario(CadastroUsuarioDto cadastroUsuario) throws JsonProcessingException {
        return usuarioClient.cadastrarUsuario(cadastroUsuario);

    }

    public UsuarioDto editarUsuario(UsuarioDto usuario, String token) throws Exception {
        JwtPayload usuarioId = JWTUtil.decodeJwt(token);

        if (usuarioId != null) {
            return usuarioClient.editarUsuario(usuarioId.getNameid(), usuario, token);
        }

        throw new Exception("Não foi possível editar dados do usuário");
    }

    public UsuarioDto removerUsuario(String token) throws Exception {
        JwtPayload usuarioId = JWTUtil.decodeJwt(token);

        if (usuarioId != null) {
            return usuarioClient.removerUsuario(usuarioId.getNameid());
        }

        throw new Exception("Não foi possível exlcuir usuário");
    }

}
