# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes

![diagramaClasse](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/114538749/1d8a0de4-0601-48ad-9c9b-8831d7624ffc)

## Modelo ER

![modelorelacional](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/114538749/2435d296-2243-4280-ba27-84cdd099abfd)

## Esquema Relacional

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Usuario",
    "type": "object",
    "properties": {
        "Id": {
            "type": "string",
            "format": "objectId"
        },
        "Nome": {
            "type": "string"
        },
        "CPF": {
            "type": "string"
        },
        "Email": {
            "type": "string",
            "format": "email"
        },
        "SenhaCriptografada": {
            "type": [
                "string",
                "null"
            ]
        },
        "Setores": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "Id": {
                        "type": "string",
                        "format": "objectId"
                    },
                    "Nome": {
                        "type": "string"
                    },
                    "Categoria": {
                        "type": "string"
                    }
                },
                "required": [
                    "Id",
                    "Nome",
                    "Categoria"
                ]
            }
        },
        "StatusUsuario": {
            "type": "string",
            "enum": [
                "Ativo",
                "Inativo"
            ]
        },
        "DataCadastro": {
            "type": "string",
            "format": "date-time"
        },
        "DataNaciemnto": {
            "type": "string",
            "format": "date-time"
        },
        "Endereco": {
            "type": "object",
            "properties": {
                "Rua": {
                    "type": "string"
                },
                "Numero": {
                    "type": "string"
                },
                "Cep": {
                    "type": "string"
                },
                "Cidade": {
                    "type": "string"
                },
                "Estado": {
                    "type": "string"
                }
            },
            "required": [
                "Rua",
                "Numero",
                "Cep",
                "Cidade",
                "Estado"
            ]
        },
        "Salario": {
            "type": "number"
        },
        "UsuarioAdmin": {
            "type": "boolean"
        }
    },
    "required": [
        "Nome",
        "CPF",
        "Email",
        "Setores",
        "StatusUsuario",
        "DataCadastro",
        "DataNaciemnto",
        "Endereco",
        "Salario",
        "UsuarioAdmin"
    ]
}
```

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Setor",
    "type": "object",
    "properties": {
        "Id": {
            "type": "string",
            "format": "objectId"
        },
        "Nome": {
            "type": "string"
        },
        "Categoria": {
            "type": "string"
        }
    },
    "required": [
        "Nome",
        "Categoria"
    ]
}
```

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Ponto",
    "type": "object",
    "properties": {
        "Id": {
            "type": "string",
            "format": "objectId"
        },
        "InicioExpediente": {
            "type": "string",
            "format": "date-time"
        },
        "InicioIntervalo": {
            "type": "string",
            "format": "date-time"
        },
        "FimIntervalo": {
            "type": "string",
            "format": "date-time"
        },
        "FimExpediente": {
            "type": "string",
            "format": "date-time"
        },
        "HorasPositivas": {
            "type": "number"
        },
        "HorasNegativas": {
            "type": "number"
        },
        "Saldo": {
            "type": "number"
        },
        "Holerite": {
            "type": "object",
            "properties": {
                "Id": {
                    "type": "string",
                    "format": "objectId"
                },
                "ValorHoraPositivas": {
                    "type": "number"
                },
                "ValorHoraNegativas": {
                    "type": "number"
                },
                "ValorTotalPositivas": {
                    "type": "number"
                },
                "ValorTotalNegativas": {
                    "type": "number"
                },
                "SalarioFinal": {
                    "type": "number"
                }
            },
            "required": [
                "Id"
            ]
        },
        "UsuarioId": {
            "type": "string"
        }
    },
    "required": [
        "id",
        "Holerite"
    ]
}
```

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Holerite",
    "type": "object",
    "properties": {
        "Id": {
            "type": "string",
            "format": "objectId"
        },
        "ValorHoraPositivas": {
            "type": "number"
        },
        "ValorHoraNegativas": {
            "type": "number"
        },
        "ValorTotalPositivas": {
            "type": "number"
        },
        "ValorTotalNegativas": {
            "type": "number"
        },
        "SalarioFinal": {
            "type": "number"
        }
    },
    "required": [
        "id"
    ]
}
```

## Modelo Físico

```json
{
  "_id": ObjectId,
  "Nome": String,
  "CPF": String,
  "Email": String,
  "SenhaCriptografada": String,
  "Setores": [
    {
      "_id": ObjectId,
      "Nome": String,
      "Categoria": String
    }
  ],
  "StatusUsuario": String,
  "DataCadastro": ISODate,
  "DataNaciemnto": ISODate,
  "Endereco": {
    "Rua": String,
    "Numero": String,
    "Cep": String,
    "Cidade": String,
    "Estado": String
  },
  "Salario": Number,
  "UsuarioAdmin": Boolean
}
```

```json
{
  "_id": ObjectId,
  "InicioExpediente": ISODate,
  "InicioIntervalo": ISODate,
  "FimIntervalo": ISODate,
  "FimExpediente": ISODate,
  "HorasPositivas": Number,
  "HorasNegativas": Number,
  "Saldo": Number,
  "Holerite": {
    "_id": ObjectId,
    "ValorHoraPositivas": Number,
    "ValorHoraNegativas": Number,
    "ValorTotalPositivas": Number,
    "ValorTotalNegativas": Number,
    "SalarioFinal": Number
  },
  "UsuarioId": ObjectId
}
```

```json
{
  "_id": ObjectId,
  "Nome": String,
  "Categoria": String
}    
```

```json
{
  "_id": ObjectId,
  "ValorHoraPositivas": Number,
  "ValorHoraNegativas": Number,
  "ValorTotalPositivas": Number,
  "ValorTotalNegativas": Number,
  "SalarioFinal": Number
}
```

## Tecnologias Utilizadas

Linguagem: C#
Frameworks: React Native
Biblioteca: React Native Paper (biblioteca de componentes Interface do Usuário)
IDE: Visual Studio Code
Ferramenta Wireframes: Draw.io
Ferramenta de Comunicação: Whatsapp e Teams
Ferramenta de Gestão de Projeto: Github Projects
Ferramentas de versionamento: Github Desktop
Banco de dados NoSql: MongoDB


## Hospedagem

Utilizamos o Microsoft Azure como nosso provedor de hospedagem. O Azure oferece uma infraestrutura escalável e confiável que nos permite implantar, gerenciar e dimensionar nosso projeto de maneira eficaz. A escolha do Azure como provedor de hospedagem garante que nossa aplicação seja hospedada em um ambiente seguro e de alto desempenho, proporcionando uma experiência estável aos nossos usuários.

## Qualidade de Software

Escolhemos trabalhar contemplando as principais características de qualidade que podem ser atribuídas ao sistema. Entre elas:
Adequação funcional: O nosso sistema está focado em ser capaz de realizar as tarefas propostas e objetivos específicos.
Confiabilidade (Tolerância a falhas): Um sistema que seja capaz de operar diante de falhas. -Maturidade: Capacidade de atingir as necessidades de confiabilidade.
Compatibilidade (Interoperabilidade): Uma das características chave do nosso projeto, pois trata-se da possibilidade de dois ou mais sistemas trocarem informações.
Portabilidade: Um ponto extremamente importante, no qual é necessário que nosso sistema consiga ser funcional em um novo hardware, software e outros ambientes.

