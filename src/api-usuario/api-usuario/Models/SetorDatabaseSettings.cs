namespace api_usuario.Models;

public class SetorDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string SetorCollectionName { get; set; } = null!;
}