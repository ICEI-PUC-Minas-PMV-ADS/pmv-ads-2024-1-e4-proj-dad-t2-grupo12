using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;


[BsonIgnoreExtraElements] 
public class Funcionario
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; } = null;

    [BsonElement("Funcionario")]
    public string NomeFuncionario { get; set; } = null;

    public string CPF { get; set; } = null;

    public ICollection <RegistroDePonto> RegistroDePonto { get; set; } = null;


}
