using Microsoft.Extensions.Options;
using MongoDB.Driver;
using registro_ponto.Models;

namespace registro_ponto.Services
{
    public class PontoService
    {
        private readonly IMongoCollection<Ponto> _pontoCollection;

        public PontoService(
            IOptions<PontoDatabaseSettings> pontoDatabaseSettings)
        {
            var mongoclient = new MongoClient(
                pontoDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoclient.GetDatabase(
                pontoDatabaseSettings.Value.DatabaseName);
            _pontoCollection = mongoDatabase.GetCollection<Ponto>(
                pontoDatabaseSettings.Value.PontoCollectionName);
        }

        public async Task<List<Ponto>> GetAsync() =>
            await _pontoCollection.Find(_ => true).ToListAsync();

        public async Task<Ponto?> GetAsync(string id) =>
            await _pontoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Ponto newPonto) =>
            await _pontoCollection.InsertOneAsync(newPonto);

        public async Task UpdateAsync(string id, Ponto updatedPonto) =>
            await _pontoCollection.ReplaceOneAsync(x => x.Id == id, updatedPonto);

        public async Task RemoveAsync(string id) =>
            await _pontoCollection.DeleteOneAsync(x => x.Id == id);
    }
}

