using api_RegistroDePonto.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using System;

public class RegistroDePontoService
{
    private readonly IMongoCollection<RegistroDePonto>_RegistroDePontoCollection;
    public RegistroDePontoService(
        IOptions<RegistroDePontoDatabaseSettings> RegistroDePontoDatabaseSettings)
    {
        var mongoclient = new MongoClient(
                RegistroDePontoDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoclient.GetDatabase(
                RegistroDePontoDatabaseSettings.Value.DatabaseName);

        _RegistroDePontoCollection = mongoDatabase.GetCollection<RegistroDePonto>(
            RegistroDePontoDatabaseSettings.Value.RegistroDePontoCollectionName);
    }
    public async Task<List<RegistroDePonto>> GetAsync() =>
        await _RegistroDePontoCollection.Find(_ => true).ToListAsync();

    public async Task<RegistroDePonto?> GetAsync(string id) =>
        await _RegistroDePontoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(RegistroDePonto newRegistroDePonto) =>
            await _RegistroDePontoCollection.InsertOneAsync(newRegistroDePonto);

    public async Task UpdateAsync(string id, RegistroDePonto updatedRegistroDePonto) =>
        await _RegistroDePontoCollection.ReplaceOneAsync(x => x.Id == id, updatedRegistroDePonto);

    public async Task RemoveAsync(string id) =>
        await _RegistroDePontoCollection.DeleteOneAsync(x => x.Id == id);

}