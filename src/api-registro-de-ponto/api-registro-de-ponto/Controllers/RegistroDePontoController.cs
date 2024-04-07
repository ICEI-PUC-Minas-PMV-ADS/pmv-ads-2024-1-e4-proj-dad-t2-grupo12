using api_RegistroDePonto.Models;
using api_RegistroDePonto.Services;
using Microsoft.AspNetCore.Mvc;

namespace api_RegistroDePonto.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class RegistroDePontoController : ControllerBase
    {
        private readonly RegistroDePontoService _RegistroDePontoService;

        public RegistroDePontoController(RegistroDePontoService RegistroDePontoService)
        {
            _RegistroDePontoService = RegistroDePontoService;
        }

        [HttpGet]
        public async Task<List<RegistroDePontoController>> Get() =>
            await _RegistroDePontoService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<RegistroDePonto>> Get(string id)
        {
            var RegistroDePonto = await _RegistroDePontoService.GetAsync(id);
            if (RegistroDePonto == null)
            {
                return NotFound();
            }

            return RegistroDePonto;
        }

        [HttpPost]
        public async Task<IActionResult> Post(RegistroDePonto newRegistroDePonto)
        {
            await _RegistroDePontoService.CreateAsync(newRegistroDePonto);

            return CreatedAtAction(nameof(Get), new { id = newRegistroDePonto.Id }, newRegistroDePonto);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, RegistroDePonto updatedRegistroDePonto)
        {
            var Funcionario = await _RegistroDePontoService.GetAsync(id);
            if (Funcionario is null)
                return NotFound();
            updatedRegistroDePonto.Id = Funcionario.Id;
            await _RegistroDePontoService.UpdateAsync(id, updatedRegistroDePonto);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var Funcionario = await _RegistroDePontoService.GetAsync(id);
            if (Funcionario is null)
                return NotFound();
            await _RegistroDePontoService.RemoveAsync(id);
            return NoContent();
        }
    }
}