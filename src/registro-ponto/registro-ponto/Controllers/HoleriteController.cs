using Microsoft.AspNetCore.Mvc;
using registro_ponto.Models;
using registro_ponto.Services;

namespace registro_ponto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HoleriteController : ControllerBase
    {
        private readonly HoleriteService _holeriteService;

        public HoleriteController(HoleriteService holeriteService)
        {
            _holeriteService = holeriteService;
        }

        [HttpGet]
        public async Task<List<Holerite>> Get() =>
            await _holeriteService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Holerite>> Get(string id)
        {
            var Holerite = await _holeriteService.GetAsync(id);
            if (Holerite == null)
            {
                return NotFound();
            }

            return Holerite;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Holerite newHolerite)
        {
            await _holeriteService.CreateAsync(newHolerite);

            return CreatedAtAction(nameof(Get), new { id = newHolerite.Id }, newHolerite);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Holerite updateHolerite)
        {
            var Holerite = await _holeriteService.GetAsync(id);
            if (Holerite is null)
                return NotFound();
            updateHolerite.Id = Holerite.Id;
            await _holeriteService.UpdateAsync(id, updateHolerite);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var Holerite = await _holeriteService.GetAsync(id);
            if (Holerite is null)
                return NotFound();
            await _holeriteService.RemoveAsync(id);
            return NoContent();
        }
    }
}
