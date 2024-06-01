namespace registro_ponto.Models;

public class RegistroSolicitacaoDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string RegistroSolicitacaoCollectionName { get; set; } = null!;
}
