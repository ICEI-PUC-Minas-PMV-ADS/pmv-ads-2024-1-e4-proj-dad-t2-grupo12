package br.puc.novaapicontroller.dto.registroponto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SolicitacaoDto {

    private String id;

    private String motivo;
    
    private String dataAlteracao;

    private String dataRegistro;

    private Boolean aprovado;

    private String status;
    
    private String usuarioId;

}
