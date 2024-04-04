using System;

namespace API_Controller.Models
{
    public class Funcionario
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Cargo { get; set; }
        public DateTime DataContratacao { get; set; }
    }
}
