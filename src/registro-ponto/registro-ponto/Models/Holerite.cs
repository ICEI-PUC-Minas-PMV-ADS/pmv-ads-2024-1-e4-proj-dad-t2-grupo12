using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace registro_ponto.Models
{
    [BsonIgnoreExtraElements]
    public class Holerite
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Required]
        public decimal ValorHoraPositivas { get; set; }

        [Required]
        public decimal ValorHoraNegativas { get; set; }

        [Required]
        public decimal ValorTotalPositivas { get; set; }

        [Required]
        public decimal ValorTotalNegativas { get; set; }

        [Required]
        public decimal SalarioFinal { get; set; }

        [Required]
        public string UsuarioId { get; set; }

    }
}
