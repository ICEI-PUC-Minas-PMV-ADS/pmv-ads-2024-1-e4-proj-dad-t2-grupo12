package br.puc.novaapicontroller.dto.Login;

import br.puc.novaapicontroller.dto.usuario.EnderecoDto;
import br.puc.novaapicontroller.dto.usuario.SetorDto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class LoginResponse extends LoginBasic {

    private String id;

}
