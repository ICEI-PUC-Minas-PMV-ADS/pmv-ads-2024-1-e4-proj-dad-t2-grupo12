namespace registro_ponto.Models
{
    public class PontoDatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string PontoCollectionName { get; set; } = null!;
    }
}
