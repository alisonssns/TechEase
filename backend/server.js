const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',  
  database: 'techeasedb'  
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

app.post("/api/register", (req, res) => {
  const { nome, email, senha } = req.body;

  const query = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)";
  db.query(query, [nome, email, senha], (err, result) => {
    if (err) {
      res.status(500).send("Erro ao cadastrar o usuário");
      return;
    }
    res.status(200).send("Usuário cadastrado com sucesso");
  });
});



app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
