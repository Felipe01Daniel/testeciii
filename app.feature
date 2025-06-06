# language: pt
Funcionalidade: Gerenciamento de Usuários
  Gerenciar cadastros de usuários

  Contexto:
    Dado que estou logado como "admin"
    E acesso a página de gerenciamento de usuários

  @regressivo @crud
  Cenário: Cadastrar novo usuário com dados válidos
    Quando clico no botão "Adicionar Novo Usuário"
    E preencho o formulário com:
      | campo      | valor           |
      | Nome       | "Felipe Daniel""    |
      | Email      | "felipe@test.com" |
    E confirmo o cadastro
    Então o sistema deve exibir o usuário "Felipe Daniel" na lista
    E o email associado deve ser "felipe@test.com"

  @consulta
  Cenário: Localizar usuário existente via busca
    Dado que existe um usuário cadastrado:
      | Nome  | "Silvana Souza" |
      | Email | "sil@test.com" |
    Quando pesquiso pelo termo "Silvana"
    Então o sistema deve retornar 1 resultado
    E o card deve exibir:
      | Nome  | "Silva Souza" |
      | Email | "sil@test.com" |

  @crud
  Cenário: Atualizar dados de usuário existente
    Dado que existe um usuário cadastrado:
      | Nome  | "Walter Daniel" |
      | Email | "walter@test.com" |
    Quando edito o usuário "Walter Antigo" com:
      | campo      | novo valor      |
      | Nome       | "Walter Daniel"   |
      | Email      | "novo@test.com" |
    E confirmo a edição
    Então o sistema deve exibir o usuário "Walter Novo"
    E não deve mais existir o usuário "Walter Antigo"

  @crud @destrutivo
  Cenário: Deletar usuário permanentemente
    Dado que existe um usuário cadastrado:
      | Nome  | "Temporário" |
      | Email | "temp@test.com" |
    Quando seleciono a opção "Excluir" para o usuário "Temporário"
    E confirmo a exclusão na modal
    Então o usuário "Temporário" não deve mais ser listado