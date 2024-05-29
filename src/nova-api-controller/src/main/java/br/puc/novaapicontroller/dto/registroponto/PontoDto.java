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
public class PontoDto {

    public String id;

    public String dataRegistro;

    public String inicioExpediente;

    public String inicioIntervalo;

    public String fimIntervalo;

    public String fimExpediente;

    public String saldo;

    private boolean isPositivo;

//    public HoleriteDto holerite;

    public String usuarioId;

}
