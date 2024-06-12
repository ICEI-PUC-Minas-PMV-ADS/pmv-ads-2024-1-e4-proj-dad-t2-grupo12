package br.puc.novaapicontroller.dto.registroponto;

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
@JsonIgnoreProperties(ignoreUnknown = true)
public class PontoDto {

    private String id;

    private String dataRegistro;

    private String inicioExpediente;

    private String inicioIntervalo;

    private String fimIntervalo;

    private String fimExpediente;

    private String saldo;

    @JsonProperty("isPositivo")
    private boolean positivo;

//    public HoleriteDto holerite;

    private String usuarioId;

}
