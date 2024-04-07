using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api_RegistroDePonto.Models
{
    [Table("Registro")]
    public class RegistroDePonto
    {
        [Key]
        public int Id { get; set; }
              
        [Required]
        public DateTime EntradaManha { get; set;}

        [Required]
        public DateTime SaidaManha { get; set; }

        [Required]
        public DateTime EntradaTarde { get; set; }

        [Required]
        public DateTime SaidaTarde { get; set; }

    }
}