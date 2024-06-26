package br.puc.novaapicontroller.service;

import br.puc.novaapicontroller.client.LoginClient;
import br.puc.novaapicontroller.client.UsuarioPontoClient;
import br.puc.novaapicontroller.dto.AlteracaoSenhaDto;
import br.puc.novaapicontroller.dto.usuario.*;
import br.puc.novaapicontroller.dto.EmailVerificacaoResponse;
import br.puc.novaapicontroller.dto.JwtPayload;
import br.puc.novaapicontroller.util.DateUtil;
import br.puc.novaapicontroller.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsuarioPontoService {

    private final UsuarioPontoClient usuarioClient;

    private final LoginClient loginClient;

    public List<UsuarioDto> obterListaUsarios() {
        return usuarioClient.obterListaUsarios();
    }

    public UsuarioDto obterUsario(String token) throws Exception {
        JwtPayload usuarioId = JWTUtil.decodeJwt(token);

        if (usuarioId != null) {
            UsuarioDto usuarioDto = usuarioClient.obterUsario(usuarioId.getNameid(), token);

            if (usuarioDto != null && (usuarioDto.getSetores() == null || usuarioDto.getSetores().isEmpty())) {
                List<SetorDto> setorDtoList = new ArrayList<>();
                SetorDto setorDto = new SetorDto();
                setorDto.setId("66021f97260c3669d68a29ca");
                setorDto.setNome("TI");
                setorDto.setCategoria("desenvolvedor");
                setorDtoList.add(setorDto);
                usuarioDto.setSetores(setorDtoList);
            }

            return usuarioDto;
        }

        throw new Exception("Não foi possível obter dados do usuário. Usuário não encontrado");
    }

    public RespostaGenerica cadastrarUsuario(CadastroUsuarioDto cadastroUsuarioDto) throws Exception {
        EmailVerificacaoResponse emailVerificacaoResponse = loginClient.verificarSeEmailExiste(cadastroUsuarioDto.getEmail());

        if (!emailVerificacaoResponse.getEmailExists()) {
            cadastroUsuarioDto.setDataCadastro(DateUtil.localDateTimeToString(LocalDateTime.now(), "yyyy-MM-dd'T'HH:mm:ss.SSS"));
            cadastroUsuarioDto.setSetores(cadastroUsuarioDto.getSetores() != null ? cadastroUsuarioDto.getSetores() : new ArrayList<>());
            cadastroUsuarioDto.setCpf(cadastroUsuarioDto.getCpf().contains(".") || cadastroUsuarioDto.getCpf().contains("-") ?
                    cadastroUsuarioDto.getCpf().replaceAll("[.-]", "") : cadastroUsuarioDto.getCpf());
            return usuarioClient.cadastrarUsuario(cadastroUsuarioDto);
        }

        throw new Exception("Email já cadastrado por outro usuário");
    }

    public UsuarioDto editarUsuario(UsuarioDto usuario, String token) throws Exception {
        JwtPayload usuarioId = JWTUtil.decodeJwt(token);

        if (usuarioId != null) {
            return usuarioClient.editarUsuario(usuarioId.getNameid(), usuario, token);
        }

        throw new Exception("Não foi possível editar dados do usuário. Usuário não encontrado");
    }

    public UsuarioDto editarUsuarioAdmin(UsuarioDto usuario, String token, String idUsuarioColaborador) throws Exception {
        try {
            JwtPayload usuarioAdminToken = JWTUtil.decodeJwt(token);

            if (usuarioAdminToken != null) {
                List<UsuarioDto> usuarioDtos = obterListaUsarios();

                if (usuarioDtos != null) {
                    UsuarioDto usuarioAdmin = usuarioDtos.stream().filter(usuarioDto -> usuarioDto.getId().equalsIgnoreCase(usuarioAdminToken.getNameid())).findFirst().orElse(null);

                    if (usuarioAdmin != null && usuarioAdmin.isUsuarioAdmin()) {
                        UsuarioDto usuarioColaborador = usuarioDtos.stream().filter(usuarioDto -> usuarioDto.getId().equalsIgnoreCase(idUsuarioColaborador)).findFirst().orElse(null);

                        if (usuarioColaborador != null) {
                            return usuarioClient.editarUsuario(usuarioColaborador.getId(), usuario, token);
                        }
                    } else {
                        throw new Exception("Este usuário não é autorizado para fazer alterações em dados de outros colaboradores");
                    }
                } else {
                    throw new Exception("Erro ao buscar listagem de usuarios");
                }
            }

            throw new Exception("Não foi possível editar dados do usuário.");
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public AlteracaoSenhaRetorno alterarSenha(AlteracaoSenhaDto novaSenha, String token) throws Exception {
        JwtPayload usuarioId = JWTUtil.decodeJwt(token);

        if (usuarioId != null) {
            return usuarioClient.alterarSenha(usuarioId.getNameid(), token, novaSenha);
        }

        throw new Exception("Não foi possível solicitar alteração de senha. Usuário não encontrado");
    }

    public UsuarioDto removerUsuario(String token) throws Exception {
        JwtPayload usuarioId = JWTUtil.decodeJwt(token);

        if (usuarioId != null) {
            return usuarioClient.removerUsuario(usuarioId.getNameid());
        }

        throw new Exception("Não foi possível exlcuir usuário. Usuário não encontrado");
    }

    public List<UsuarioDto> filtrarPorNome(String nome) {
        List<UsuarioDto> usuarioDtos = obterListaUsarios();

        return usuarioDtos.stream().filter(usuarioDto -> usuarioDto.getNome().toLowerCase().contains(nome.toLowerCase())).collect(Collectors.toList());
    }

}
