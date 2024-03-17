using api_usuario.Models;
using api_usuario.Services;
using Microsoft.AspNetCore.Mvc;

namespace api_usuario.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        public async Task<List<Usuario>> Get() =>
            await _usuarioService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Usuario>> Get(string id)
        {
            var Usuario = await _usuarioService.GetAsync(id);
            if (Usuario == null)
            {
                return NotFound();
            }

            return Usuario;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Usuario newUsuario)
        {
            await _usuarioService.CreateAsync(newUsuario);

            return CreatedAtAction(nameof(Get), new { id = newUsuario.Id }, newUsuario);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Usuario updateUsuario)
        {
            var Usuario = await _usuarioService.GetAsync(id);
            if (Usuario is null)
                return NotFound();
            updateUsuario.Id = Usuario.Id;
            await _usuarioService.UpdateAsync(id, updateUsuario);
            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var Usuario = await _usuarioService.GetAsync(id);
            if (Usuario is null)
                return NotFound();
            await _usuarioService.RemoveAsync(id);
            return NoContent();
        }
    }
}
