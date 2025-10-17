## Instruções
Estrutura, regras e requisitos do projeto

Esse projeto consiste no desenvolvimento de uma API REST chamada FindAFriend para um sistema de adoção de animais. O projeto deve ser construído reforçando os conceitos de SOLID e a prática de testes automatizados.

A API deve seguir um conjunto de funcionalidades e regras de negócio.

## Funcionalidades da Aplicação
- [ ] O cadastro de um pet
- [ ] A listagem de todos os pets disponíveis para adoção em uma determinada cidade
- [ ] A filtragem de pets com base em suas características (como idade, porte, etc.)
- [ ] A visualização dos detalhes de um pet específico
- [ ] O cadastro de uma ORG (organização)
- [ ] O login de uma ORG no sistema

## Regras de Negócio
As seguintes condições devem ser implementadas:

- [ ] A informação da cidade é obrigatória para listar os pets
- [ ] Uma ORG deve, obrigatoriamente, ter um endereço e um número de WhatsApp
- [ ] Todo pet cadastrado precisa estar vinculado a uma ORG
- [ ] O contato do usuário interessado em adotar um pet será feito diretamente com a ORG via WhatsApp
- [ ] Todos os filtros de características do pet, com exceção da cidade, são opcionais
- [ ] Para que uma ORG tenha acesso administrativo à aplicação, ela deve estar logada

## Tarefas
Use este checklist para ajudar a organizar a sua entrega

- [ ] Rota para cadastrar uma ORG, garantindo que inclua endereço e número de WhatsApp
- [ ] Rota de login para uma ORG
- [ ] Rota para cadastrar um pet, garantindo que ele seja associado a uma ORG
- [ ] Rota para listar pets, exigindo a cidade como parâmetro obrigatório
- [ ] Implementar a funcionalidade de filtros opcionais por características dos pets na listagem
- [ ] Rota para visualizar os detalhes de um pet específico
- [ ] Garantir que o acesso de administrador da ORG seja restrito a usuários logados
- [ ] Aplicar os princípios SOLID durante o desenvolvimento da estrutura da API
- [ ] Criar testes para validar as funcionalidades e regras de negócio