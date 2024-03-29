using System.ComponentModel.DataAnnotations;

namespace api_usuario.Models;

public class RegisterDto
{
    [Required]
    public string Nome { get; set; }

    [Required]
    public string Cpf { get; set; }

    [Required]
    public string Email { get; set; }
    
    [Required]
    public string Senha { get; set; }
    
    [Required]
    public string ConfirmacaoSenha { get; set; }
    
    [Required]
    public Endereco Endereco { get; set; }
}