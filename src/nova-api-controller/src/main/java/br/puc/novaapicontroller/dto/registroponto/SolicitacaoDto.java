package br.puc.novaapicontroller.dto.registroponto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolicitacaoDto {

    private String id;

    private String motivo;
    
    private String novaData;

    private String dataSolicitacao;

    private String tipoPeriodo;

    private Boolean aprovado;

    private String status;
    
    private String usuarioId;

    private String pontoId;

}
