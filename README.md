# TechEase

![TechEase](https://github.com/user-attachments/assets/c2d0584a-749a-4413-914d-7d3f7f0c4ad1)

## Sobre o projeto
Este projeto surgiu durante o ensino médio técnico em informática, eu e um amigo(Vagner), precisavamos de uma ideia para um TCC e deveria ser apenas um site que tivesse conexão com o banco de dados, visto isso, passamos longos 8 meses desenvolvendo os designs, aprendendo mais sobre CSS, JS e MySQL e por fim acabamos com um resultado melhor do que o esperado. Dois anos depois, ao estudar mais sobre React e GitHub, resolvi recriar o projeto de uma forma mais "Profissional", com isso, fico muito feliz com o resultado final deste projeto e agregou em muito o meu conhecimento sobre a tecnologia, por fim, estarei disponibilizando o link do projeto antigo para a visualização:

- [Projeto Antigo](https://github.com/alisonssns/Site-E-Commerce-TCC)
- [Primeira Prototipação](https://marvelapp.com/project/6692998)
- [Documento TCC](https://docs.google.com/document/d/1SqLKsOpYGP1spy0KtiVy3Wc55bOlrBr5BXq_63PbwCs/edit?usp=sharing)

## Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/alisonssns/TechEase
```

### 2. Instale as dependências
```bash
cd TechEase
npm install
```

### 3. Importe a base de dados

#### Via terminal:
```bash
mysql -u root -p nome_do_banco < backend/dumps/backup.sql
```

#### Ou via MySQL Workbench:
1. Abra o MySQL Workbench.
2. Acesse **Server** > **Data Import**.
3. Escolha **Import from Self-Contained File** e selecione `backend/dumps/backup.sql`.
4. Escolha o banco de dados correto e inicie a importação.

### 4. Crie um arquivo `.env`
Crie um arquivo chamado **.env** na raiz do projeto e insira o seguinte conteúdo:
```bash
# .env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=seu_banco
```

## Uso

### Iniciando o projeto
```bash
npm start
```

Agora o projeto estará rodando localmente. Acesse o link disponibilizado no seu terminal.

## Funcionalidades
- Cadastro e login de usuários
- Seleção, compra de produtose pesquisas
- Alterar infomações de sua conta
- Listagem de seus ultimos pedidos
- E mais...

## Tecnologias Utilizadas

### Frontend:
  
- **axios:** Cliente HTTP para fazer requisições assíncronas.
- **react:** Biblioteca principal para construção de interfaces.
- **react-dom:** Integra o React com a árvore DOM do navegador.
- **react-icons:** Conjunto de ícones populares para React.
- **react-router-dom:** Gerenciamento de rotas no React.
- **react-slick:** Carrossel de slides para React.
- **slick-carousel:** Biblioteca base para o react-slick.

### Backend:

- **bcrypt:** Biblioteca para criptografar senhas com hash seguro.
- **cors:** Middleware para permitir requisições de diferentes origens (CORS).
- **dotenv:** Gerencia variáveis de ambiente a partir de um arquivo .env.
- **express:** Framework minimalista para criação de APIs e servidores Node.js.
- **mysql2:** Cliente MySQL para Node.js, usado para conectar ao banco de dados.

- **Banco de Dados:** MySQL
- **Autenticação:** JWT

## Contribuição
Contribuições são bem-vindas!
Caso queira me contatar ou tirar uma duvida sobre o projeto:
**Email:** alisoncracas2@gmail.com
Muito obrigado!


## Licença
Este projeto está licenciado sob a **MIT License**.

## Autores e Agradecimentos
- **Alisson Luis Cordeiro de Arruda** - Desenvolvedor
- Agradecimentos à comunidade de código aberto! 🚀
