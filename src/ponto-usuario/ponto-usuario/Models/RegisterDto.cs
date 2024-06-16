using System.ComponentModel.DataAnnotations;

namespace ponto_usuario.Models
{
    public class RegisterDto
    {
        [Required]
        public string Nome { get; set; }

        [Required]
        public string Cpf { get; set; }

        [Required]
        public string Email { get; set; }
        
        public string Senha { get; set; }

        public string ConfirmacaoSenha { get; set; }

        public Endereco Endereco { get; set; }
        
        public string StatusUsuario { get; set; }
        
        public List<Setor> Setores { get; set; }
        
        public string DataCadastro { get; set; }

        public string DataNascimento { get; set; }
        
        public bool UsuarioAdmin { get; set; }
        
    }
}
