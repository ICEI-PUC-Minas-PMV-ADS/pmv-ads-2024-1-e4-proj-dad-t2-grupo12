using api_usuario.Models;
using api_usuario.Services;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class EnderecoController : ControllerBase
{
    private readonly IMongoCollection<Endereco> _enderecosCollection;

    public EnderecoController(IMongoDatabase database)
    {
        _enderecosCollection = database.GetCollection<Endereco>("enderecos");
    }

    // GET: api/Endereco
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Endereco>>> Get()
    {
        return await _enderecosCollection.FindAsync(new BsonDocument()).ToListAsync();
    }

    // GET: api/Endereco/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Endereco>> Get(int id)
    {
        var filter = Builders<Endereco>.Filter.Eq(x => x.Id, id);
        var endereco = await _enderecosCollection.FindOneAsync(filter);

        if (endereco == null)
        {
            return NotFound();
        }

        return endereco;
    }

    // POST: api/Endereco
    [HttpPost]
    public async Task<ActionResult<Endereco>> Post(Endereco endereco)
    {
        await _enderecosCollection.InsertOneAsync(endereco);

        return CreatedAtAction(nameof(Get), new { id = endereco.Id }, endereco);
    }

    // PUT: api/Endereco/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(int id, Endereco endereco)
    {
        if (id != endereco.Id)
        {
            return BadRequest();
        }

        var filter = Builders<Endereco>.Filter.Eq(x => x.Id, id);
        var update = Builders<Endereco>.Update.Set(x => x.Rua, endereco.Rua)
            .Set(x => x.Numero, endereco.Numero)
            .Set(x => x.Cep, endereco.Cep)
            .Set(x => x.Cidade, endereco.Cidade)
            .Set(x => x.Estado, endereco.Estado);

        await _enderecosCollection.UpdateOneAsync(filter, update);

        return NoContent();
    }

    // DELETE: api/Endereco/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var filter = Builders<Endereco>.Filter.Eq(x => x.Id, id);
        await _enderecosCollection.DeleteOneAsync(filter);

        return NoContent();
    }
}
