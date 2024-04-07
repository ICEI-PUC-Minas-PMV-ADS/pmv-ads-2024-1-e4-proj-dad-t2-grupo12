using Microsoft.Extensions.Options;
using MongoDB.Driver;
using registro_ponto.Models;

namespace registro_ponto.Services
{
    public class HoleriteService
    {
        private readonly IMongoCollection<Holerite> _holeriteCollection;

        public HoleriteService(
            IOptions<HoleriteDatabaseSettings> holeriteDatabaseSettings)
        {
            var mongoclient = new MongoClient(
                holeriteDatabaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoclient.GetDatabase(
                holeriteDatabaseSettings.Value.DatabaseName);
            _holeriteCollection = mongoDatabase.GetCollection<Holerite>(
                holeriteDatabaseSettings.Value.HoleriteCollectionName);
        }

        public async Task<List<Holerite>> GetAsync() =>
            await _holeriteCollection.Find(_ => true).ToListAsync();

        public async Task<Holerite?> GetAsync(string id) =>
            await _holeriteCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Holerite newHolerite) =>
            await _holeriteCollection.InsertOneAsync(newHolerite);

        public async Task UpdateAsync(string id, Holerite updatedHolerite) =>
            await _holeriteCollection.ReplaceOneAsync(x => x.Id == id, updatedHolerite);

        public async Task RemoveAsync(string id) =>
            await _holeriteCollection.DeleteOneAsync(x => x.Id == id);
    }
}
