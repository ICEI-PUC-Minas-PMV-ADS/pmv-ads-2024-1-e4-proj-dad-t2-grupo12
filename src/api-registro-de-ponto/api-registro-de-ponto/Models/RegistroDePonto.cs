using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;



public class RegistroDePonto
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]

    public int Id { get; set; } = null;

    [BsonElement("RegistroDePonto")]
    public DateTime entradaManha  { get; set; } = null;
       
    public DateTime saidadaManha { get; set; } = null;
        
    public DateTime entraAlmoco { get; set; } = null;
        
    public DateTime saidaAlmoco { get; set; } = null;
       
    public DateTime entradaTarde { get; set; } = null;
       
    public DateTime saidaTarde { get; set; } = null;

}
