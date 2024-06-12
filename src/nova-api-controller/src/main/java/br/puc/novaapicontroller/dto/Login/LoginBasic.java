package br.puc.novaapicontroller.dto.Login;

import br.puc.novaapicontroller.dto.usuario.EnderecoDto;
import br.puc.novaapicontroller.dto.usuario.SetorDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginBasic {

    private String email;

    private EnderecoDto endereco;

    private List<SetorDto> setores;

    private String dataNacimento;

    private String salario;

    private String jwtToken;

}
