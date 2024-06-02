using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ponto_usuario.Models
{
    [BsonIgnoreExtraElements]
    public class Usuario
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public string CPF { get; set; }

        [Required]
        public string Email { get; set; }

        public string SenhaCriptografada { get; set; }

        [Required]
        public List<Setor> Setores { get; set; }

        [Required]
        public StatusUsuario StatusUsuario { get; set; }

        [Required]
        public DateTime DataCadastro { get; set; }

        [Required]
        public DateTime DataNascimento { get; set; }

        [Required]
        public Endereco Endereco { get; set; }

        [Required]
        public decimal Salario { get; set; }

        [Required]
        public bool UsuarioAdmin { get; set; }

        public Usuario(RegisterDto registerDto)
        {
            Nome = registerDto.Nome;
            Email = registerDto.Email;
            CPF = registerDto.Cpf;
            SenhaCriptografada = registerDto.Senha;
            Endereco = registerDto.Endereco;
        }

    }

    public enum StatusUsuario
    {
        [Display(Name = "Ativo")]
        Ativo,

        [Display(Name = "Inativo")]
        Inativo
    }

    [BsonIgnoreExtraElements]
    public class Endereco
    {
        public string Rua { get; set; }

        public string Numero { get; set; }

        public string Cep { get; set; }

        public string Cidade { get; set; }

        public string Estado { get; set; }

    }
}
