package br.puc.novaapicontroller.dto.Login;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class LoginSiteResponse extends LoginBasic {

    private int matricula;

    private String mensagem;

}


