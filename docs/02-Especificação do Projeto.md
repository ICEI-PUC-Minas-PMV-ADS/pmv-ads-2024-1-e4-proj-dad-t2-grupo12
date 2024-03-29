# Especificações do Projeto

Este documento descreve a especificação de um aplicativo de controle de ponto para automatizar e otimizar a gestão de horas trabalhadas na empresa. 
A marcação de ponto manual apresenta diversos problemas, como:  erros frequentes na marcação manual, como inconsistências de horário e digitação incorreto, dificuldades no controle de horas extras, dificuldade de correção de ponto, dentre outros. 
Para o desenvolvimento do aplicativo, serão utilizadas diversas técnicas e ferramentas de gestão.<br>
* Brainstorming
* Modelagem de Processos
* Prototipagem
* Documentação Técnica
* Validação de Requisitos
* Simulação e Modelagem
* Diagrama de Casos de Uso
* Avaliação de Usabilidade

O desenvolvimento de um aplicativo de controle de ponto trará diversos benefícios para a empresa e seus colaboradores, como agilidade, precisão, confiabilidade e economia de tempo. A utilização de técnicas e ferramentas de gestão adequadas garantirá que o projeto seja bem-sucedido e atenda às necessidades de todos os envolvidos


Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

As personas levantadas durante o processo de entendimento do problema são apresentadas na Figuras que se seguem.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/100534402/835bf97d-dceb-44ef-8c5c-65cbd1340682)<br>
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/100534402/5e82a8c8-de69-4a68-b244-4d49883ae89b)<br>
![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/100534402/c3bd3a08-f5ea-48c6-b244-710238382dd9)


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`          | QUERO/PRECISO ... `FUNCIONALIDADE`                  |PARA ... `MOTIVO/VALOR`                 |
|------------------------------|-----------------------------------------------------|----------------------------------------|
|Eu como... funcionário<br> usuário_01| Desejo ter... liberdade para registrar o <br>ponto de qualquer lugar | Para que eu possa ter mobilidade em<br>meu local de trabalho.|
|Eu como... funcionário<br> usuário_02 2|Desejo ter… acompanhar o valor a ser recebido a<br> partir das horas já trabalhadas| Para que… que eu possa programar<br> minha margem de ganho mensal|
|Eu como…  gerente de RH |Desejo ter … de uma forma de acompanhar e<br> monitorar o ponto dos funcionários| Para que … que eu possa ter mais confiabilidade<br>na apuração das horas trabalhadas|
| Eu como… supervisor de área |Desejo ter … monitorar e aprovar o<br> ponto dos funcionários|Para que … eu possa gerar relatórios confiáveis<br> e dinâmicos a minha gerência|

## Modelagem do Processo de Negócio 

### Análise da Situação Atual

A partir dos problemas apresentados anteriormente são os fatores geradores de oportunidades de melhoria. 
Desta forma, a partir do mapeamento de processo do negócio é possível perceber o fluxo e funcionamento da cadeia de ações a serem realizadas que ajudarão na implementação do software. 
A seguir o mapeamento do modelo de negócio


### Descrição Geral da Proposta

A proposta a seguir busca identificar e explicitar o fluxo de informações identificando os atores de interferência e seus respectivos papéis na cadeia de usabilidade do solução.

### Processo 1 – MACROPROCESSO DE USABILIDADE DO APP

Foi identificado ao longo do processo as seguintes oportunidade de melhorias:<br> 
. desenvolver um aplicativo de controle de ponto a partir da base de dados geradas pelo setor de RH,<br>
. criação de aplicativo de uso pessoal e intransferível para registro de ponto,<br>
. disponibilizar relatórios com informações de horas trabalhadas e valores a receber destinado ao setores de interesse,<br>
. permitir que o funcionário solicite sua correção do registro de ponto, quando necessário,<br>
. criar uma página de status das aprovações e correções de ponto, disponibilizando ao usuário<br>

![Processo 1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/100534402/1f277e78-009f-4dbe-b063-64b6ba422d32)

## Indicadores de Desempenho

![indicadores_desempenho](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/114538749/9f6a172f-cb82-450e-aa75-3d03c5af7fda)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade de requisitos, aplicar uma técnica de priorização de requisitos e detalhar como a técnica foi aplicada.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| A aplicação deve permitir o registro do horário de trabalho. | ALTA | 
|RF-002| A aplicação deve permitir a visualização do saldo de horas.   | ALTA |
|RF-003| A aplicação deve permitir o login na plataforma pelo usuário.   | ALTA |
|RF-004| A aplicação deve permitir que o usuário administrador cadastre usuários colaboradores.   | ALTA |
|RF-005| A aplicação deve permitir a aprovação / reprovação dos horários dos colaboradores pelos usuários administradores.   | MÉDIA |
|RF-006| A aplicação deve permitir a visualização dos valores a receber.   | MÉDIA |
|RF-007| A aplicação deve permitir o gerenciamento do acesso dos usuários colaboradores  pelos usuários administradores.   | BAIXA |
|RF-008| A aplicação deve permitir ao usuário colaborador a solicitação de alteração no registro dos pontos.   | BAIXA |
|RF-009| A aplicação deve permitir o uso da localização para validação do registro.   | BAIXA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| A aplicação deve ser responsiva para funcionar em dispositivos móveis. | MÉDIA | 
|RNF-002| A aplicação deve ter um bom nível de contraste entre os elementos da tela para que esteja em conformidade. | MÉDIA | 
|RNF-003| O código do aplicativo deve ser modular e bem documentado para facilitar a manutenção e correção de bugs.   | MÉDIA |
|RNF-004| O aplicativo deve garantir a segurança dos dados dos usuários, como fotos, CPF e informações de localização.   | MÉDIA |
|RNF-005| O sistema deve ser compatível com os principais navegadores do mercado (Google Chrome, Firefox, Microsoft Edge).   | BAIXA |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|RE-01| A aplicação não poderá compartilhar dados sensíveis a qualquer outra plataforma, cumprindo os padrões de sigilo e tratativa de dados segundo a LGPD. |
|RE-02| O projeto deverá ser entregue no final do semestre letivo, não podendo extrapolar a data de 19/06/2024.        |
|RE-03| A equipe não pode subcontratar o desenvolvimento do trabalho.       |

# Arquitetura Distribuída do projeto

![arq distribuida drawio](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/86340530/8557a65b-1717-4c1d-a9d9-ef0be19fffdf)

## Diagrama de Casos de Uso

![Diagrama-de-caso-de-uso](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/107152636/7e44cdca-68f5-4022-84e0-f88e37d13b72)

# Matriz de Rastreabilidade

![matriz](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/114538749/c893ce45-1353-4c82-8b72-5f050c7f72c4)

# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

| |<b> Duração (Dias)|Início|Término|
|-|------------------|------|-------|
|Projeto|124|20/02/2024|23/06/2024|
|Documentação|96|27/02/2024|02/06/2024|
|Implementação do banco de dados|34|04/03/2024|07/04/2024|
|Desenvolvimento de aplicação|90|04/03/2024|02/06/2024|
|Testes e correção de bugs|27|06/05/2024|02/06/2024|
|Apresentação da aplicação|20|03/06/2024|23/06/2024|

## Gerenciamento de Equipe

![Tabela equipe](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/86340530/2070a753-d6b2-407c-8c44-325d1632801a)

## Gestão de Orçamento

|Recursos necessários|Valores (R$)|
|--------------------|------------|
|Recursos Humanos|155.000,00|
|Rede|5.000,00|
|Software|30.000,00|
|Serviços|7.000|
|<b>TOTAL|197.000,00|
