using System.ComponentModel.DataAnnotations;
using System.Globalization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ponto_usuario.Models
{
    [BsonIgnoreExtraElements]
    public class Usuario
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

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
        public string StatusUsuario { get; set; }

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
            StatusUsuario = registerDto.StatusUsuario;
            Setores = registerDto.Setores;

            DataNascimento = DateTime.Parse(registerDto.DataNascimento, CultureInfo.InvariantCulture,
                DateTimeStyles.RoundtripKind);
            DataCadastro = DateTime.Parse(registerDto.DataCadastro, CultureInfo.InvariantCulture,
                DateTimeStyles.RoundtripKind);

            UsuarioAdmin = registerDto.UsuarioAdmin;
        }

        public Usuario()
        {
        }

        public Usuario(string id, string nome, string cpf, string email, string senhaCriptografada, List<Setor> setores,
            string statusUsuario,
            DateTime dataCadastro, DateTime dataNascimento, Endereco endereco, decimal salario, bool usuarioAdmin)
        {
            Id = id;
            Nome = nome;
            CPF = cpf;
            Email = email;
            SenhaCriptografada = senhaCriptografada;
            Setores = setores;
            StatusUsuario = statusUsuario;
            DataCadastro = dataCadastro;
            DataNascimento = dataNascimento;
            Endereco = endereco;
            Salario = salario;
            UsuarioAdmin = usuarioAdmin;
        }
    }

    public class Endereco
    {
        public string Rua { get; set; }
        public string Numero { get; set; }
        public string Cep { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
    }
}