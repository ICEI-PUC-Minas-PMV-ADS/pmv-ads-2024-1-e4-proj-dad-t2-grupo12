using api_usuario.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

var bsonDocument = new BsonDocument
{
    { "_id", new BsonInt32(endereco.Id) },
    { "rua", new BsonString(endereco.Rua) },
    { "numero", new BsonInt32(endereco.Numero) },
    { "cep", new BsonString(endereco.Cep) },
    { "cidade", new BsonString(endereco.Cidade) },
    { "estado", new BsonString(endereco.Estado) }
};

var collection = database.GetCollection<BsonDocument>("enderecos");
await collection.InsertOneAsync(bsonDocument);


var filter = Builders<BsonDocument>.Filter.Eq("_id", new BsonInt32(id));
var enderecoDocument = await collection.FindOneAsync(filter);

// Convertendo BsonDocument para Endereco
var endereco = new Endereco
{
    Id = enderecoDocument["_id"].AsInt32,
    Rua = enderecoDocument["rua"].AsString,
    Numero = enderecoDocument["numero"].AsInt32,
    Cep = enderecoDocument["cep"].AsString,
    Cidade = enderecoDocument["cidade"].AsString,
    Estado = enderecoDocument["estado"].AsString
};


var update = Builders<BsonDocument>.Update.Set("rua", new BsonString("Nova Rua"));
await collection.UpdateOneAsync(filter, update);


await collection.DeleteOneAsync(filter);
