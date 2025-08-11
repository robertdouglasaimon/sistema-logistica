const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Caminho absoluto para o banco de dados
const dbPath = path.resolve(__dirname, '../banco-dados/logistica-db.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err);
  } else {
    console.log('Conectado ao banco SQLite!');
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor com SQLite funcionando!');
});

// GET Empresa
app.get('/Empresa', (req, res) => {
  db.all('SELECT * FROM Empresa', [], (err, rows) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.status(500).send('Erro ao buscar Empresa');
    } else {
      res.json(rows);
    }
  });
});

// POST Empresa
app.post('/Empresa', (req, res) => {
  const { cnpj, telefone, endereco, razaoSocial, email, status } = req.body;
  const sql = `INSERT INTO Empresa (cnpj, telefone, endereco, razao_social, email, status)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(sql, [cnpj, telefone, endereco, razaoSocial, email, status], function(err) {
    if (err) {
      console.error('Erro ao inserir empresa:', err);
      res.status(500).json({ erro: 'Erro ao cadastrar empresa' });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

// GET Filial
app.get('/Filial', (req, res) => {
  db.all('SELECT * FROM Filial', [], (err, rows) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.status(500).send('Erro ao buscar Filial');
    } else {
      res.json(rows);
    }
  });
});

// POST Filial
app.post('/Filial', (req, res) => {
  const { nome, tipo, status, endereco, id_empresa, nome_empresa } = req.body;
  const sql = `INSERT INTO Filial (nome, tipo, status, endereco, id_empresa, nome_empresa)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(sql, [nome, tipo, status, endereco, id_empresa, nome_empresa], function(err) {
    if (err) {
      console.error('Erro ao inserir filial:', err);
      res.status(500).json({ erro: 'Erro ao cadastrar filial' });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});


// DELETE Filial
app.delete('/Filial/:id_filial', (req, res) => {
  const id_filial = req.params.id_filial;
  const sql = "DELETE FROM Filial WHERE id_filial = ?";

  db.run(sql, [id_filial], function(err) {
    if (err) {
      console.error("Erro ao excluir filial:", err);
      res.status(500).send("Erro no servidor");
    } else {
      res.status(200).send("Filial excluída com sucesso");
    }
  });
});

// PUT Filial
app.put('/Filial/:id_filial', (req, res) => {
  const id_filial = req.params.id_filial;
  const { nome, tipo, status, endereco, nome_empresa } = req.body;

  const sqlBuscaEmpresa = `SELECT * FROM Empresa WHERE razao_social = ?`;

  db.get(sqlBuscaEmpresa, [nome_empresa], (err, empresaExistente) => {
    if (err) {
      console.error('Erro ao buscar empresa:', err);
      return res.status(500).json({ erro: 'Erro ao verificar empresa' });
    }

    if (!empresaExistente) {
      const sqlCriaEmpresa = `INSERT INTO Empresa (razao_social, status) VALUES (?, ?)`;
      db.run(sqlCriaEmpresa, [nome_empresa, 'Ativa'], function(err) {
        if (err) {
          console.error('Erro ao criar empresa:', err);
          return res.status(500).json({ erro: 'Erro ao criar empresa' });
        }

        const novoIdEmpresa = this.lastID;
        atualizarFilial(novoIdEmpresa);
      });
    } else {
      atualizarFilial(empresaExistente.id_empresa);
    }

    function atualizarFilial(idEmpresa) {
      const sqlAtualizaFilial = `
        UPDATE Filial 
        SET nome = ?, tipo = ?, status = ?, endereco = ?, id_empresa = ?, nome_empresa = ? 
        WHERE id_filial = ?
      `;

      db.run(sqlAtualizaFilial, [nome, tipo, status, endereco, idEmpresa, nome_empresa, id_filial], function(err) {
        if (err) {
          console.error("Erro ao editar filial:", err);
          res.status(500).send("Erro no servidor");
        } else {
          res.status(200).send("Filial editada com sucesso");
        }
      });
    }



  });
});


// Criando uma rota para buscar Funcionario
app.get('/Funcionario', (req, res) => {
  db.all('SELECT * FROM Funcionario', [], (err, rows) => {
    if (err) {
      console.error('Erro na consulta:', err);
      res.status(500).send('Erro ao buscar Funcionario');
    } else {
      res.json(rows);
    }
  });
});


// Inicia o servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
