using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;


namespace registro_ponto.Models
{
    [BsonIgnoreExtraElements]
    public class Ponto
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [Required]
        public DateTime DataRegistro { get; set; }

        public DateTime? InicioExpediente { get; set; }

        public DateTime? InicioIntervalo { get; set; }

        public DateTime? FimIntervalo { get; set; }

        public DateTime? FimExpediente { get; set; }

        public string? Saldo { get; set; }

        public bool? isPositivo { get; set; }

        [Required]
        public string UsuarioId { get; set; }

    }

}
