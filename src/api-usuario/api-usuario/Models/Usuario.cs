using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace api_usuario.Models
{
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
        public DateTime DataNaciemnto { get; set; }

        [Required]
        public Endereco Endereco { get; set; }

        [Required]
        public decimal Salario { get; set; }

        [Required]
        public bool UsuarioAdmin { get; set; }

    }

    public enum StatusUsuario
    {
        [Display(Name = "Ativo")]
        Ativo,

        [Display(Name = "Inativo")]
        Inativo
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
