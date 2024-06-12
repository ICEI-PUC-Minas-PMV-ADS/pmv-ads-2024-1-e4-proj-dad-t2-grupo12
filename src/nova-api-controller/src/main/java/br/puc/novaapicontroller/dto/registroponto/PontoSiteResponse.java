package br.puc.novaapicontroller.dto.registroponto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PontoSiteResponse {

    private String id;

    private String dataRegistro;

    private String inicioExpediente;

    private String inicioIntervalo;

    private String fimIntervalo;

    private String fimExpediente;

    private String saldo;

    private boolean isPositivo;

}
