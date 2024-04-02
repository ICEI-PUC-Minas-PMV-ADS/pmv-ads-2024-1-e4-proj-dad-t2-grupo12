using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace ponto_usuario.Models
{
    public class Setor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public string Categoria { get; set; }
    }
}
