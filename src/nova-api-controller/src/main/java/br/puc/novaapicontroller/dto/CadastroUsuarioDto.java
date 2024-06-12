package br.puc.novaapicontroller.dto;

import br.puc.novaapicontroller.dto.usuario.EnderecoDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    
}
