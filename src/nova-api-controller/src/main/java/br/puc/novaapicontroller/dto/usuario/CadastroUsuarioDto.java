package br.puc.novaapicontroller.dto.usuario;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CadastroUsuarioDto {

    private String nome;

    private String cpf;

    private String email;

    private String senha;

    private String confirmacaoSenha;

    private EnderecoDto endereco;

    private String statusUsuario;

    private List<SetorDto> setores;

    private String dataCadastro;

    private String dataNascimento;

    private boolean usuarioAdmin;

}
