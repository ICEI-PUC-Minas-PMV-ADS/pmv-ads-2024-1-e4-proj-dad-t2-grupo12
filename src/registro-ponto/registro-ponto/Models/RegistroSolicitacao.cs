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
    public DateTime NovaData { get; set; }
    
    [Required]
    public string tipoPeriodo { get; set; }

    [Required]
    public DateTime DataSolicitacao { get; set; }

    public bool? Aprovado { get; set; }

    public string? Status { get; set; }
    
    [Required]
    public string UsuarioId { get; set; }
    
    [Required]
    public string PontoId { get; set; }

}