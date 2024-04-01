using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;


[Table("Registros")]
public class RegistroDePonto
{
    [Key]
    public int Id { get; set; }

    [Required]
    public DateTime entradaManha  { get; set; }

    [Required]
    public DateTime saidadaManha { get; set; }

    [Required]
    public DateTime entraAlmoco { get; set; }

    [Required]
    public DateTime saidaAlmoco { get; set; }

    [Required]
    public DateTime entradaTarde { get; set; }
    
    [Required]
    public DateTime saidaTarde { get; set; }

}
