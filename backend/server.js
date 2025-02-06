require('dotenv').config({ path: './dotenv.env' });
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');

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
  const ordersArr = [ 'id_prod desc', 'id_prod asc', 'valor_prod asc', 'valor_prod desc']

  if (filter) {
    query += ' WHERE nome_prod LIKE ? or cat_prod LIKE ?';
    queryParams.push(`%${filter}%`);
    queryParams.push(`%${filter}%`);
  }

  if(order) {
    query += ` ORDER BY ${ordersArr[order]}`;
  }

  if(limit){
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

app.get('/api/recentes', (req, res) => {
  db.query('SELECT * FROM produtos order by id_prod desc LIMIT 4', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

app.get('/api/random', (req, res) => {
  db.query('SELECT * FROM produtos ORDER BY RAND() LIMIT 5', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
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

    bcrypt.compare(senha, results[0].senha, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erro ao verificar a senha");
      }

      if (!isMatch) {
        return res.status(401).send("E-mail ou senha inválidos.");
      }

      res.status(200).send("Login realizado com sucesso!");
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
