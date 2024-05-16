package br.puc.novaapicontroller.dto.usuario;

import br.puc.novaapicontroller.util.enums.StatusUsuarioEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDto {

    private String id;

    private String nome;

    private String cpf;

    private String email;

    private String senhaCriptografada;

    private List<SetorDto> setores;

    private StatusUsuarioEnum statusUsuario;

    private String dataCadastro;

    private String dataNaciemnto;

    private EnderecoDto endereco;

    private Double salario;

    private boolean usuarioAdmin;

}
