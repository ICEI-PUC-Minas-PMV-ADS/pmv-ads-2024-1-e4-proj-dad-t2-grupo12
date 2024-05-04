# Plano de Testes de Software

A seguir são descritos os testes funcionais a serem executados:

| Caso de Teste | CT-01 - Registro de horários |
|---------------|--------------------------|
| Requisitos Associados | RF-001 - A aplicação deve permitir o registro do horário de trabalho. |
| Objetivo do Teste | Verificar se o registro dos horários de trabalho estão sendo feitos corretamente |
| Passos | 1- Acessar a aplicação; <br> 2- Acessar o Registro de Ponto; <br> 3- Fazer o registro do ponto; |
| Critérios de Êxito | O horário registrado deverá ser exibido na linha do tempo de registros. Além disso, o registro deve permanecer para consultas posteriores.

| Caso de Teste | CT-02 - Saldo de horas |
|---------------|--------------------------|
| Requisitos Associados | RF-002 - A aplicação deve permitir a visualização do saldo de horas.	 |
| Objetivo do Teste | Verificar se os cálculos e exibições de horários extras ou faltantes estão corretos. Além de refletir as mudanças causadas pelo registros dos horários de trabalho seguintes |
| Passos | 1- Acessar a aplicação; <br> 2- Acessar o painel de espelho de ponto ou a visão do dia dos horários; |
| Critérios de Êxito | O saldo de horas deve ser exibido corretamente, indicando as horas faltantes ou extras geradas. Simultaneamente ao registro de horários, o saldo deve modificar-se, calculando corretamente os saldos.

| Caso de Teste | CT-03 - Login na plataforma |
|---------------|--------------------------|
| Requisitos Associados | RF-003 - A aplicação deve permitir o login na plataforma pelo usuário.	 |
| Objetivo do Teste | Verificar se o login está ocorrendo corretamente |
| Passos | 1- Acessar a aplicação; <br> 2- Na página inicial inserir os dados de login <br> 3- Selecionar o botão "entrar"; |
| Critérios de Êxito | Ao digitar as informações erradas o usuário deve ser avisado por uma mensagem que os dados estão incorretos, o ícone de visualização da senha deve exibir a senha ao ser selecionado e o login correto deve encaminhar o usuário para a página principal da aplicação.

| Caso de Teste | CT-04 - Cadastro de colaboradores	 |
|---------------|--------------------------|
| Requisitos Associados | RF-004 -A aplicação deve permitir que o usuário administrador cadastre usuários colaboradores.	 |
| Objetivo do Teste | Verificar se o cadastro de colaboradores está ocorrendo corretamente |
| Passos | 1- Acessar a aplicação; <br> 2- Acesssr a aba de cadastro de colaborador; |
| Critérios de Êxito | O usuário administrador deve conseguir com êxito cadastrar novos colaboradores, inserindo informações como dados pessoais, setor e outros campos.

| Caso de Teste | CT-05 - Aprovação/Reprovação de registros |
|---------------|--------------------------|
| Requisitos Associados | RF-005 - A aplicação deve permitir a aprovação / reprovação dos horários dos colaboradores pelos usuários administradores. |
| Objetivo do Teste | Verificar se o usuário administrador consegue fazer corretamente a reprovação ou aprovação de uma solicitação de mudança nos registros de ponto, feita pelo usuário colaborador. |
| Passos | 1- Acessar a aplicação; <br> 2- Buscar pelo colaborador ou acessar a aba solicitações <br> 3- Acessar a solicitação do colaborador; |
| Critérios de Êxito | O usuário administrador deve abrir corretamente a solicitação do colaborador e visualizar os registros do dia e a solicitação de alteração, bem como motivo da solicitação e outros campos. Ao final, o usuário administrador poderá aceitar ou recusar a solicitação e esta decisão deverá ser registrada. 

| Caso de Teste | CT-06 - Valores a receber |
|---------------|--------------------------|
| Requisitos Associados | RF-006 - A aplicação deve permitir a visualização dos valores a receber. |
| Objetivo do Teste | Verificar se o usuário consegue visualizar de maneira correta os cálculos e resultados da conversão das horas extras e faltantes em valores a receber ou a serem descontados |
| Passos | 1- Acessar a aplicação; <br> 2- Acessar a aba de valores; |
| Critérios de Êxito | Os valores devem ser exibidos com os cálculos baseados no saldo de horas e estes valores devem ser alterados simultaneamente a mudança diária no saldo de horas.

| Caso de Teste | CT-07 - Gerenciar acesso |
|---------------|--------------------------|
| Requisitos Associados | RF-007 - A aplicação deve permitir o gerenciamento do acesso dos usuários colaboradores pelos usuários administradores.	 |
| Objetivo do Teste | Verificar se o gerenciamento do acesso dos colaboradores pelos usuários administradores está ocorrendo corretamente |
| Passos | 1- Acessar a aplicação; <br> 2- Acessar o perfil do colaborador; |
| Critérios de Êxito | O administrador deve conseguir ativar ou desativar o acesso de um colaborador bem como ajustar outros campos relacionados ao trabalho.

| Caso de Teste | CT-08 - Solicitação de mudança |
|---------------|--------------------------|
| Requisitos Associados | RF-008 - A aplicação deve permitir ao usuário colaborador a solicitação de alteração no registro dos pontos. |
| Objetivo do Teste | Verificar se o colaborador consegue solicitar corretamente uma mudança nos registros de horário |
| Passos | 1- Acessar a aplicação; <br> 2- Acessar um dia específico; <br> 3- Fazer a solicitação de mudança; |
| Critérios de Êxito | O colaborador deve acessar corretamente o dia que gostaria de fazer a solicitação de mudança. Nesta tela com o espelho do dia, o colaborador deve conseguir enviar sua solicitação corretamente, inserindo uma justificativa e a alteração desejada.

