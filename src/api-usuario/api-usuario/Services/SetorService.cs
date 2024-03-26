using api_usuario.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

namespace api_usuario.Services;

public class SetorService
{
    private readonly IMongoCollection<Setor> _setorCollection;

    public SetorService(
        IOptions<SetorDatabaseSettings> setorDatabaseSettings)
    {
        var mongoclient = new MongoClient(
            setorDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoclient.GetDatabase(
            setorDatabaseSettings.Value.DatabaseName);
        _setorCollection = mongoDatabase.GetCollection<Setor>(
            setorDatabaseSettings.Value.SetorCollectionName);
    }

    public async Task<List<Setor>> GetAsync() =>
        await _setorCollection.Find(_ => true).ToListAsync();

    public async Task<Setor?> GetAsync(string id) =>
        await _setorCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Setor newSetor) =>
        await _setorCollection.InsertOneAsync(newSetor);

    public async Task UpdateAsync(string id, Setor updatedSetor) =>
        await _setorCollection.ReplaceOneAsync(x => x.Id == id, updatedSetor);

    public async Task RemoveAsync(string id) =>
        await _setorCollection.DeleteOneAsync(x => x.Id == id);
}