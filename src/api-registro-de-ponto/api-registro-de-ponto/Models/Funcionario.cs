using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;


[Table("Funcionarios")]
public class Funcionario
{
    [key]
    public string Id { get; set; }

    [Required]
    public string NomeFuncionario { get; set; }

    [Required]
    public string CPF { get; set; }

    public ICollection <RegistroDePonto> RegistroDePonto { get; set; }


}
