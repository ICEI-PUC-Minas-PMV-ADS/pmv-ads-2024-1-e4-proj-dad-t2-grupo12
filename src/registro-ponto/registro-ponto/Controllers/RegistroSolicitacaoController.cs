using Microsoft.AspNetCore.Mvc;
using registro_ponto.Models;
using registro_ponto.Services;

namespace registro_ponto.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RegistroSolicitacaoController : ControllerBase
{
    private readonly RegistroSolicitacaoService _socilitacaoService;
    
            public RegistroSolicitacaoController(RegistroSolicitacaoService solicitacaoService)
            {
                _socilitacaoService = solicitacaoService;
            }
    
            [HttpGet]
            public async Task<List<RegistroSolicitacao>> Get() =>
                await _socilitacaoService.GetAsync();
    
            [HttpGet("{id:length(24)}")]
            public async Task<ActionResult<RegistroSolicitacao>> Get(string id)
            {
                var solicitacao = await _socilitacaoService.GetAsync(id);
                if (solicitacao == null)
                {
                    return NotFound();
                }
    
                return solicitacao;
            }
    
            [HttpPost]
            public async Task<IActionResult> Post(RegistroSolicitacao newSolicitacao)
            {
                await _socilitacaoService.CreateAsync(newSolicitacao);
    
                return CreatedAtAction(nameof(Get), new { id = newSolicitacao.Id }, newSolicitacao);
            }
    
            [HttpPut("{id:length(24)}")]
            public async Task<IActionResult> Update(string id, RegistroSolicitacao updatePonto)
            {
                var solicitacao = await _socilitacaoService.GetAsync(id);
                if (solicitacao is null)
                    return NotFound();
                updatePonto.Id = solicitacao.Id;
                await _socilitacaoService.UpdateAsync(id, updatePonto);
                return NoContent();
            }
    
            [HttpDelete("{id:length(24)}")]
            public async Task<IActionResult> Delete(string id)
            {
                var solicitacao = await _socilitacaoService.GetAsync(id);
                if (solicitacao is null)
                    return NotFound();
                await _socilitacaoService.RemoveAsync(id);
                return NoContent();
            }
}