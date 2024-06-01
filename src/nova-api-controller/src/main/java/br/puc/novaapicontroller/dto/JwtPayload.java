package br.puc.novaapicontroller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtPayload {

    private String nameid;

    private Integer nbf;

    private Integer exp;

    private Integer iat;

}
