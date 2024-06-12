using Microsoft.Extensions.Options;
using MongoDB.Driver;
using registro_ponto.Models;

namespace registro_ponto.Services;

public class RegistroSolicitacaoService
{
    private readonly IMongoCollection<RegistroSolicitacao> _solicitacaoCollection;

    public RegistroSolicitacaoService(
        IOptions<RegistroSolicitacaoDatabaseSettings> solicitacaoDatabaseSettings)
    {
        var mongoclient = new MongoClient(
            solicitacaoDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoclient.GetDatabase(
            solicitacaoDatabaseSettings.Value.DatabaseName);
        _solicitacaoCollection = mongoDatabase.GetCollection<RegistroSolicitacao>(
            solicitacaoDatabaseSettings.Value.RegistroSolicitacaoCollectionName);
    }

    public async Task<List<RegistroSolicitacao>> GetAsync() =>
        await _solicitacaoCollection.Find(_ => true).ToListAsync();

    public async Task<RegistroSolicitacao?> GetAsync(string id) =>
        await _solicitacaoCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(RegistroSolicitacao newSolicitacao) =>
        await _solicitacaoCollection.InsertOneAsync(newSolicitacao);

    public async Task UpdateAsync(string id, RegistroSolicitacao updatedSolicitacao) =>
        await _solicitacaoCollection.ReplaceOneAsync(x => x.Id == id, updatedSolicitacao);

    public async Task RemoveAsync(string id) =>
        await _solicitacaoCollection.DeleteOneAsync(x => x.Id == id);
}