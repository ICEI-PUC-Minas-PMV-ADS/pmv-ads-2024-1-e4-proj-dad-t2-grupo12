using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;


namespace registro_ponto.Models;

[BsonIgnoreExtraElements]
public class RegistroSolicitacao
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [Required]
    public string? Motivo { get; set; }
    
    [Required]
    public DateTime DataAlteracao { get; set; }

    [Required]
    public DateTime DataRegistro { get; set; }

    public bool? Aprovado { get; set; }

    public string? Status { get; set; }
    
    [Required]
    public string UsuarioId { get; set; }

}