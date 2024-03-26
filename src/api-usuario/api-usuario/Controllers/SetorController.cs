using api_usuario.Models;
using api_usuario.Services;
using Microsoft.AspNetCore.Mvc;

namespace api_usuario.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SetorController : ControllerBase
    {
        private readonly SetorService _setorService;

        public SetorController(SetorService setorService)
        {
            _setorService = setorService;
        }

        [HttpGet]
        public async Task<List<Setor>> Get() =>
            await _setorService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Setor>> Get(string id)
        {
            var Setor = await _setorService.GetAsync(id);
            if (Setor == null)
            {
                return NotFound();
            }

            return Setor;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Setor newSetor)
        {
            await _setorService.CreateAsync(newSetor);

            return CreatedAtAction(nameof(Get), new { id = newSetor.Id }, newSetor);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Setor updateSetor)
        {
            var Setor = await _setorService.GetAsync(id);
            if (Setor is null)
                return NotFound();
            updateSetor.Id = Setor.Id;
            await _setorService.UpdateAsync(id, updateSetor);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var Setor = await _setorService.GetAsync(id);
            if (Setor is null)
                return NotFound();
            await _setorService.RemoveAsync(id);
            return NoContent();
        }
    }
}