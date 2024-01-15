Feature: Adicionar produtos ao carrinho

Scenario Outline: Buscar e adicionar produtos ao carrinho deslogado
  Given que o usuario esta na pagina inicial
  And the "<User>" is logged
  When o usuário busca e adiciona o produto "<Produto>" ao carrinho
  Then I should see the "<Produto>" in the cart

Examples:
  | User             | Produto            |
  | John Travolta    | Sabonete            |
  | John Travolta    | Shampoo          |
  | John Travolta    | Hidratante           |
  | John Travolta    | Esfoliante          |
  | John Travolta    | Antirrugas |

Scenario Outline: Buscar e adicionar produtos ao carrinho logado
  Given the user is logged
  When o usuário busca e adiciona o produto "<Produto>" ao carrinho
  Then I should see the "<Produto>" in the cart

Examples:
  | Produto         |
  | iPhone          |
  | Carregador       |
  | AirPods          |
  | Carteira     |
  | O Pequeno Príncipe |

