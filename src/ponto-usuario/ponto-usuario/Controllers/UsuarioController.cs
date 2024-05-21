using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32.SafeHandles;
using ponto_usuario.Models;
using ponto_usuario.Services;

namespace ponto_usuario.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [AllowAnonymous]
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

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Post(RegisterDto registerDto)
        {
            if (registerDto.Senha != registerDto.ConfirmacaoSenha)
            {
                var responseErro = new
                {
                    Message = "Senha e confirmação de senha não conferem.",
                };

                return BadRequest(responseErro);
            }

            await _usuarioService.CreateAsync(registerDto);

            var responseOk = new
            {
                Message = "Usuario cadastrado com sucesso!",
                Data = registerDto.Email
            };

            return Ok(responseOk);
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

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<ActionResult> Authentication(AuthenticateDto model)
        {
            var usuarioDb = await _usuarioService.FindByEmail(model.Email);

            if (usuarioDb == null || !BCrypt.Net.BCrypt.Verify(model.Password, usuarioDb.SenhaCriptografada))
            {
                return Unauthorized();
            }

            var jwt = GenerateJwtToken(usuarioDb);

            return Ok(new
            {
                jwtToken = jwt
            });
        }

        private string GenerateJwtToken(Usuario usuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("H7d0AABBgP0yx7A2W3q6OFcULADa2jCx");
            var claims = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id)
            });

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
