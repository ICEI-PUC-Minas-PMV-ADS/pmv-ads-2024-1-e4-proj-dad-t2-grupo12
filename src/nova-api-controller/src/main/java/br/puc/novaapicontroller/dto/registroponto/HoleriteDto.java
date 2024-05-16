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
public class HoleriteDto {

    private String id;

    private Double valorHoraPositivas;

    private Double valorHoraNegativas;

    private Double valorTotalPositivas;

    private Double valorTotalNegativas;

    private Double salarioFinal;

    private String usuarioId;

}
