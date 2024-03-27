using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace api_usuario.Models;

public class Setor
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Idok { get; set; }

    [Required]
    public string Nome { get; set; }

    [Required]
    public string Categoria { get; set; }

}