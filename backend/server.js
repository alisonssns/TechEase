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
  db.query('SELECT * FROM produtos', (err, results) => {
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
