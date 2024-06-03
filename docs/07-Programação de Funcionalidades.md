# Programação de Funcionalidades

# Programação de Funcionalidades Mobile

## Tela de registro de ponto

O registro de ponto permite ao usuário registrar o horário de trabalho ou intervalo. A página inicia na data atual e sem registros. Pressionando o botão "+" no canto inferior direito da tela, o usuário pode registrar o horário atual em algum tópico do registro de ponto como "Início do expediente", "Início Intervalo", "Fim Intervalo" e "Fim do expediente" sequencialmente. Ao fazer o registro, um modal de confirmação é exibido disponibilizando ao usuário as opções de confirmar ou desfazer o registro, e consequentemente, registrar ou não no banco de dados.

Paralelamente ao registro, o saldo de horas é calculado e logo exibido em "Saldo do dia". Após o preenchimento de todos os 4 tópicos e tranalho, o botão de registro é inativado e o usuário poderá, se desejar, solicitar a alteração do ponto no botão no canto inferior esquerdo da página.

Os horários inseridos pelo usuário são registrados no banco de dados e assim também, o usuário pode navegar entre as datas e visualizar seus registros anteriores que são exibidos de acordo com os registros armazenados anteriormente no banco de dados.

As exibições de horas trabalhadas no dia e saldo total ainda estão em desenvolvimento.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/114538749/8047b619-f202-4e1d-81a4-5d0324d30a0e) ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/114538749/b082837c-f2c3-45ac-9658-836e8d4210fd) ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/114538749/371b9d15-ecb7-4f6a-a284-e96690c69849) ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/114538749/3fca9602-0a0d-499b-aa90-03345ededa80)

## Tela de espelho de ponto

O espelho de ponto exibe os registros de ponto do usuário por semana. A lista de registros é carregada por uma requisição do backend que retorna a listagem de registro do usuário que é exibida de 7 em 7 dias e pode ser explorado pressionando "Anterior" ou "Próximo". É possível visualizar a data do registro, horário de entrada, horário de saída e saldo do dia.

A funcionalidade de clicar no dia e ser encaminhado para a tela de registro com o detalhe do dia ainda está em desenvolvimento. 

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/114538749/4ab44f3b-0813-46c3-bff7-e021d0046cbd) ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/114538749/097d33d9-28e1-4417-b001-7f269f3e62b6)

## Tela do usuário

A tela do usuário exibe o perfil com informações detalhadas como e-mail, CPF, endereço e data de nascimento. Além disso, oferece a importante funcionalidade de troca de senha, caso o usuário necessite realizar essa alteração.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/86340530/40bfa51f-77f2-4ee5-92d2-33e01e048662)![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/assets/86340530/eaa6695d-598d-4147-b66b-d1c089d0a58a)

## Tela de solicitar alteração

A tela de solicitar alteração permite o usuário acessar as informações de horários registrados em seu perfil e solicitar alteração dessas informações. O colaborador, ao escolher a data no calendário, pode alterar os horários, escrever o motivo da alteração, anexar um arquivo e enviar a solicitação ao administrador.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/blob/Leo/src/inicial-usuario/assets/Sa1.png)![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/blob/Leo/src/inicial-usuario/assets/Sa2.png)

## Tela de saldos e holerite

A tela de saldos e holerite exibe várias informações sobre o registro de ponto do colaborador. Nela, podemos visualizar uma tabela com os dados de entrada e saída do colaborador e seu saldo diário de horas extras. Além disso, podemos ver os cálculos do saldo final mensal de horas com o seu valor final em dinheiro, as horas extras totais e seu valor em dinheiro, e também as horas devidas totais e seu valor em dinheiro.

![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/blob/Leo/src/inicial-usuario/assets/Sh1.png)![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-grupo12/blob/Leo/src/inicial-usuario/assets/Sh2.png)

