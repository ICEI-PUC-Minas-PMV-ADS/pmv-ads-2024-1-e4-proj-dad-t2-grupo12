using System;

namespace API_Controller.Models
{
    public class RegistroPonto
    {
        public int Id { get; set; }
        public int FuncionarioId { get; set; }
        public DateTime DataHora { get; set; }
        public TipoRegistroPonto Tipo { get; set; }
    }

    public enum TipoRegistroPonto
    {
        Entrada,
        Saida
    }
}
