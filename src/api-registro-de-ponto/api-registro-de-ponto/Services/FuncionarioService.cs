using api_usuario.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;
using System;

public class FuncionarioService
{
    private readonly IMongoCollection<Funcionario>_FuncionarioCollection;
    public FuncionarioService(
        IOptions<FuncionarioDatabaseSettings> FuncionarioDatabaseSettings)
    {
        var mongoclient = new MongoClient(
                FuncionarioDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoclient.GetDatabase(
                FuncionarioDatabaseSettings.Value.DatabaseName);

        _FuncionarioCollection = mongoDatabase.GetCollection<Funcionario>(
            FuncionarioDatabaseSettings.Value.FuncionarioCollectionName);
    }
    public async Task<List<Funcionario>> GetAsync() =>
        await _FuncionarioCollection.Find(_ => true).ToListAsync();
    
    public async Task<Funcionario?> GetAsync(string id) =>
        await _FuncionarioCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    
    public async Task CreateAsync(Funcionario newFuncionario) =>
            await _FuncionarioCollection.InsertOneAsync(newFuncionario);

    public async Task UpdateAsync(string id, Funcionario updatedFuncionario) =>
        await _FuncionarioCollection.ReplaceOneAsync(x => x.Id == id, updatedFuncionario);

    public async Task RemoveAsync(string id) =>
        await _FuncionarioCollection.DeleteOneAsync(x => x.Id == id);

}