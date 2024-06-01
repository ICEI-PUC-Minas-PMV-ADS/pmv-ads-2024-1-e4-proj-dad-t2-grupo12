package br.puc.novaapicontroller.dto.registroponto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PontoSiteResponse {

    public String id;

    public String dataRegistro;

    public String inicioExpediente;

    public String inicioIntervalo;

    public String fimIntervalo;

    public String fimExpediente;

    private String saldo;

    private boolean isPositivo;

}
