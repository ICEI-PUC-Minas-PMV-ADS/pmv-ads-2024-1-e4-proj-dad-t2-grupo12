using Microsoft.AspNetCore.Mvc;
using registro_ponto.Models;
using registro_ponto.Services;

namespace registro_ponto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PontoController : ControllerBase
    {
        private readonly PontoService _pontoService;

        public PontoController(PontoService pontoService)
        {
            _pontoService = pontoService;
        }

        [HttpGet]
        public async Task<List<Ponto>> Get() =>
            await _pontoService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Ponto>> Get(string id)
        {
            var Ponto = await _pontoService.GetAsync(id);
            if (Ponto == null)
            {
                return NotFound();
            }

            return Ponto;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Ponto newPonto)
        {
            await _pontoService.CreateAsync(newPonto);

            return CreatedAtAction(nameof(Get), new { id = newPonto.Id }, newPonto);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Ponto updatePonto)
        {
            var Ponto = await _pontoService.GetAsync(id);
            if (Ponto is null)
                return NotFound();
            updatePonto.Id = Ponto.Id;
            await _pontoService.UpdateAsync(id, updatePonto);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var Ponto = await _pontoService.GetAsync(id);
            if (Ponto is null)
                return NotFound();
            await _pontoService.RemoveAsync(id);
            return NoContent();
        }
    }
}
