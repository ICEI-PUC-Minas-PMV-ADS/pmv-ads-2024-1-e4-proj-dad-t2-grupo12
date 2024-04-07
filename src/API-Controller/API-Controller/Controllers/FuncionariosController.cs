using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using API_Controller.Models;

namespace API_Controller.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FuncionariosController : ControllerBase
    {
        private static List<Funcionario> funcionarios = new List<Funcionario>()
        {
            new Funcionario { Id = 1, Nome = "João", Cargo = "Desenvolvedor", DataContratacao = new DateTime(2022, 1, 1) },
            new Funcionario { Id = 2, Nome = "Maria", Cargo = "Designer", DataContratacao = new DateTime(2022, 2, 1) }
        };

        private static List<RegistroPonto> registrosPonto = new List<RegistroPonto>();

        [HttpGet]
        public ActionResult<IEnumerable<Funcionario>> Get()
        {
            return Ok(funcionarios);
        }

        [HttpGet("{id}")]
        public ActionResult<Funcionario> Get(int id)
        {
            var funcionario = funcionarios.Find(f => f.Id == id);
            if (funcionario == null)
            {
                return NotFound();
            }
            return Ok(funcionario);
        }

        [HttpPost]
        public ActionResult<Funcionario> Post(Funcionario funcionario)
        {
            funcionario.Id = funcionarios.Count + 1;
            funcionarios.Add(funcionario);
            return CreatedAtAction(nameof(Get), new { id = funcionario.Id }, funcionario);
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, Funcionario funcionarioAtualizado)
        {
            var index = funcionarios.FindIndex(f => f.Id == id);
            if (index == -1)
            {
                return NotFound();
            }

            funcionarios[index] = funcionarioAtualizado;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var index = funcionarios.FindIndex(f => f.Id == id);
            if (index == -1)
            {
                return NotFound();
            }

            funcionarios.RemoveAt(index);
            return NoContent();
        }

        [HttpPost("{funcionarioId}/registro-ponto")]
        public ActionResult RegistrarPonto(int funcionarioId, TipoRegistroPonto tipo)
        {
            var funcionario = funcionarios.Find(f => f.Id == funcionarioId);
            if (funcionario == null)
            {
                return NotFound("Funcionário não encontrado.");
            }

            var registroPonto = new RegistroPonto
            {
                Id = registrosPonto.Count + 1,
                FuncionarioId = funcionarioId,
                DataHora = DateTime.Now,
                Tipo = tipo
            };

            registrosPonto.Add(registroPonto);
            return Ok("Registro de ponto realizado com sucesso.");
        }
    }
}