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
        public string Id { get; set; }

        [Required]
        public DateTime DataRegistro { get; set; }

        [Required]
        public DateTime InicioExpediente { get; set; }

        [Required]
        public DateTime InicioIntervalo { get; set; }

        [Required]
        public DateTime FimIntervalo { get; set; }

        [Required]
        public DateTime FimExpediente { get; set; }

        public decimal Saldo { get; set; }

        public Holerite Holerite { get; set; }

        [Required]
        public string UsuarioId { get; set; }

    }

}
