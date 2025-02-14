require('dotenv').config({ path: './dotenv.env' });
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

app.use(cors());

app.get('/api/produtos', (req, res) => {
  const { filter, order, limit } = req.query;

  let query = 'SELECT * FROM produtos';
  const queryParams = [];
  const ordersArr = ['id_prod desc', 'id_prod asc', 'valor_prod asc', 'valor_prod desc', 'rand()']

  if (filter) {
    query += ' WHERE nome_prod LIKE ? or cat_prod LIKE ?';
    queryParams.push(`%${filter}%`);
    queryParams.push(`%${filter}%`);
  }

  if (order) {
    query += ` ORDER BY ${ordersArr[order]}`;
  }

  if (limit) {
    query += ` LIMIT ${limit}`
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.post('/api/produtoEscolhido', (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID do produto não fornecido" });
  }

  const query = 'SELECT * FROM produtos WHERE id_prod = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(results[0]);
  });
});

app.post("/api/updateCart", async (req, res) => {
  const { idUser, idProd, option } = req.query;
  const querys = [
    "INSERT INTO carrinhousuario (id_prod, id_user, quantidade) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE quantidade = quantidade + 1;",
    "UPDATE carrinhousuario SET quantidade = quantidade - 1 WHERE id_prod = ? AND id_user = ? AND quantidade > 1;",
    "DELETE FROM carrinhousuario WHERE id_prod = ? AND id_user = ?"];

  db.query(querys[option], [idProd, idUser], (err, result) => {
    if (err) {
      console.error("Erro ao executar a query: ", err);
      return res.status(500).json({ error: "Erro ao atualizar carrinho" });
    }

    res.status(200).json({ message: "Carrinho atualizado com sucesso", result });
  });
});

app.get('/api/getCartContent', (req, res) => {
  const { idUser } = req.query;
  const query = "SELECT produtos.*, carrinhousuario.quantidade FROM carrinhousuario INNER JOIN produtos ON carrinhousuario.id_prod = produtos.id_prod WHERE carrinhousuario.id_user = ?;";

  db.query(query, [idUser], (err, cartItems) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(cartItems);
  })
});

app.get('/api/orders', (req, res) => {
  const { idUser } = req.query;
  const query = "SELECT * from pedidos where id_user = ? ORDER BY id DESC"

  db.query(query, [idUser], (err, orders) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    res.json(orders)
  })
})

app.get('/api/orderProducts', (req, res) => {
  const { orderId } = req.query;
  const query = "SELECT produtos.*, pedidoprodutos.quantidade FROM pedidoprodutos INNER JOIN produtos ON pedidoprodutos.id_prod = produtos.id_prod WHERE pedidoprodutos.id_pedido = ?";

  db.query(query, [orderId], (err, cartItems) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(cartItems);
  })
});

app.post('/api/checkout', (req, res) => {
  const { carrinho, userId } = req.body;

  let query = "INSERT INTO pedidos (id_user, valor_total) values (?, ?)";
  const totalValue = carrinho.reduce((total, item) => total + (item.valor_prod * item.quantidade), 0);

  db.query(query, [userId, totalValue], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao realizar pedido");
    }

    const pedidoId = result.insertId;

    const produtosQuery = "INSERT INTO pedidoprodutos (id_pedido, id_prod, quantidade) VALUES ?";
    const produtosParams = carrinho.map(item => [
      pedidoId,
      item.id_prod,
      item.quantidade,
    ]);

    db.query(produtosQuery, [produtosParams], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao adicionar produtos ao pedido");
      }
      res.status(200).send("Pedido realizado com sucesso");
    });

    const cartQuery = "DELETE FROM carrinhousuario where id_user = ?";

    db.query(cartQuery, [userId], (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
});


app.post("/api/register", async (req, res) => {
  const { nome, email, senha } = req.body;

  const saltRounds = 10;
  bcrypt.hash(senha, saltRounds, (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao criptografar a senha");
    }

    const query = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
    db.query(query, [nome, email, hashedPassword], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao cadastrar o usuário");
      }
      res.status(200).send("Usuário cadastrado com sucesso");
    });
  });
});

app.post("/api/login", (req, res) => {
  const { email, senha } = req.body;

  const query = "SELECT * FROM usuarios WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro no servidor.");
    }
    if (results.length === 0) {
      return res.status(401).send("E-mail ou senha inválidos.");
    }

    const usuario = results[0];

    bcrypt.compare(senha, usuario.senha, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao verificar a senha.");
      }

      if (!isMatch) {
        return res.status(401).send("E-mail ou senha inválidos.");
      }

      const SECRET_KEY = process.env.JWT_SECRET || "chave_padrao_segura";
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.json({
        token: token,
        user: usuario
      });
    });
  });
});

app.post('/api/addressRegister', (req, res) => {
  const { newAddress, userId } = req.body;
  const addressQuery = "INSERT INTO enderecos (cep_end, uf_end, cidade_end, bairro_end, rua_end, num_end, comp_end, tipo_end, id_user) VALUES (?,?,?,?,?,?,?,?,?)"
  db.query(addressQuery, [newAddress.cep, newAddress.uf, newAddress.localidade, newAddress.bairro, newAddress.logradouro, newAddress.numero, newAddress.complemento, newAddress.tipo, userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Erro ao verificar a senha.");
    }
    const userQuery = `UPDATE usuarios SET cpf = ?, ddd = ?, telefone = ?, nomeCompleto = ? WHERE id = ?`;
    db.query(userQuery, [newAddress.cpf, newAddress.ddd, newAddress.telefone, newAddress.nomeCompleto, userId], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao atualizar os dados do usuário.");
      }
      res.status(200).send("Endereço cadastrado com sucesso.");
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
