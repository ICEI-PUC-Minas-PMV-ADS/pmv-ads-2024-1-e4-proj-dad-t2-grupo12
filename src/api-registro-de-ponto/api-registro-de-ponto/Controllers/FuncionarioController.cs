using api_RegistroDePonto.Models;
using api_RegistroDePonto.Services;
using Microsoft.AspNetCore.Mvc;

namespace api_RegistroDePonto.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class FuncionarioController : ControllerBase
    {
        private readonly FuncionarioService _FuncionarioService;

        public FuncionarioController(FuncionarioService FuncionarioService)
        {
            _FuncionarioService = FuncionarioService;
        }

        [HttpGet]
        public async Task<List<Funcionario>> Get() =>
            await _FuncionarioService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Funcionario>> Get(string id)
        {
            var Funcionario = await _FuncionarioService.GetAsync(id);
            if (Funcionario == null)
            {
                return NotFound();
            }

            return Funcionario;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Funcionario newFuncionario)
        {
            await _FuncionarioService.CreateAsync(newFuncionario);

            return CreatedAtAction(nameof(Get), new { id = newFuncionario.Id }, newFuncionario);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Funcionario updatedFuncionario)
        {
            var Funcionario = await _FuncionarioService.GetAsync(id);
            if (Funcionario is null)
                return NotFound();
            updatedFuncionario.Id = Funcionario.Id;
            await _FuncionarioService.UpdateAsync(id, updatedFuncionario);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var Funcionario = await _FuncionarioService.GetAsync(id);
            if (Funcionario is null)
                return NotFound();
            await _FuncionarioService.RemoveAsync(id);
            return NoContent();
        }
    }
}