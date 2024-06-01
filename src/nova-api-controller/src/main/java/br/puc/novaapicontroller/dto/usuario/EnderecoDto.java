package br.puc.novaapicontroller.dto.usuario;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnderecoDto {

    private String rua;

    private String numero;

    private String cep;

    private String cidade;

    private String estado;
}
