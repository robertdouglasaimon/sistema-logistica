/*--ARQUIVO PRINCIPAL BACK-END--*/

// Importa os módulos necessários
const express = require('express'); // Framework para criar o servidor web (rotas HTTP)
const cors = require('cors'); // Middleware que libera o acesso ao servidor vindo de outros domínios (como o front-end React ou Next.js)
const sqlite3 = require('sqlite3').verbose(); // Importa SQLite com logs mais completos para depuração

// Inicializa a aplicação Express
const app = express();
app.use(cors()); // Ativa o CORS para evitar bloqueio do navegador ao consumir a API.
app.use(express.json()); // Para receber JSON no corpo da requisição

// Conecta ao banco de dados SQLite (arquivo .db)
// O caminho './banco-dados/logistica-db.db' precisa estar correto em relação ao back-end.js.
const db = new sqlite3.Database('../banco-dados/logistica-db.db', (err) => {
  if (err) {
    console.error('Erro ao conectar ao SQLite:', err); // Mostra erro se não conseguir conectar.
  } else {
    console.log('Conectado ao banco SQLite!'); // Mensagem de sucesso.
  }
});

// Rota básica para testar se o servidor está rodando
app.get('/', (req, res) => { // Rota para a raiz da URL.
  res.send('Servidor com SQLite funcionando!'); // Resposta simples na raiz da URL.
});

/*------------------------ROTAS PARA SOLICITAR DADOS--------------------------------------*/

// Rota GET para retornar todos os dados da tabela 'Empresa'
app.get('/Empresa', (req, res) => {
  // Executa uma consulta SQL no banco
  db.all('SELECT * FROM Empresa', [], (err, rows) => {
    if (err) {
      console.error('Erro na consulta:', err); // Mostra erro caso aconteça algum problema com a consulta.
      res.status(500).send('Erro ao buscar Empresa'); // Retorna erro para o front-end através do status 500.
    } else {
      res.json(rows); // Retorna os resultados em formato JSON para o front-end.
    }
  });
});

// Codigo que servirá para a rota de inserir dados na tabela Empresa:
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

// Rota GET para retornar todos os dados da tabela 'Filial'
app.get('/Filial', (req, res) => {
  // Executa uma consulta SQL no banco
  db.all('SELECT * FROM Filial', [], (err, rows) => {
    if (err) {
      console.error('Erro na consulta:', err); // Mostra erro caso aconteça algum problema com a consulta.
      res.status(500).send('Erro ao buscar Filial'); // Retorna erro para o front-end através do status 500.
    } else {
      res.json(rows); // Retorna os resultados em formato JSON para o front-end.
    }
  });
});

// Codigo que servirá para a rota de inserir dados na tabela Filial:
app.post('/Filial', (req, res) => {
  const { nome, tipo, status, created_at, endereco, id_empresa } = req.body;

  const sql = `INSERT INTO Filial (nome, tipo, status, created_at, endereco, id_empresa)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.run(sql, [nome, tipo, status, created_at, endereco, id_empresa], function(err) {
    if (err) {
      console.error('Erro ao inserir filial:', err);
      res.status(500).json({ erro: 'Erro ao cadastrar filial' });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

// Rota GET para DELETAR os dados do banco via botão (usuário):
app.delete('/Filial/:id_filial', (req, res) => {
  const id_filial = req.params.id_filial;
  console.log("ID recebido para exclusão:", id_filial); // Log para verificar se o ID chegou corretamente

  const sql = "DELETE FROM Filial WHERE id_filial = ?"; // Corrigido para usar o campo correto
  db.run(sql, [id_filial], function(err) {
    if (err) {
      console.error("Erro ao excluir filial:", err);
      res.status(500).send("Erro no servidor");
    } else {
      res.status(200).send("Filial excluída com sucesso");
    }
  });
});

// Rota GET para EDITAR os dados do banco via botão (usuário):
app.put('/Filial/:id_filial', (req, res) => {
  const id_filial = req.params.id_filial;
  const { nome, tipo, status, created_at, endereco, nome_empresa } = req.body;

  // Verifica se a empresa já existe pelo nome
  const sqlBuscaEmpresa = `SELECT * FROM Empresa WHERE razao_social = ?`;

  db.get(sqlBuscaEmpresa, [nome_empresa], (err, empresaExistente) => {
    if (err) {
      console.error('Erro ao buscar empresa:', err);
      return res.status(500).json({ erro: 'Erro ao verificar empresa' });
    }

    if (!empresaExistente) {
      // Se não existe, cria a empresa
      const sqlCriaEmpresa = `INSERT INTO Empresa (razao_social, status) VALUES (?, ?)`;
      db.run(sqlCriaEmpresa, [nome_empresa, 'Ativa'], function(err) {
        if (err) {
          console.error('Erro ao criar empresa:', err);
          return res.status(500).json({ erro: 'Erro ao criar empresa' });
        }

        atualizarFilial(); // Depois de criar, atualiza a filial
      });
    } else {
      atualizarFilial(); // Se já existe, só atualiza a filial
    }

    // Atualiza os dados da filial com o nome da empresa
    function atualizarFilial() {
      const sqlAtualizaFilial = `
        UPDATE Filial 
        SET nome = ?, tipo = ?, status = ?, created_at = ?, endereco = ?, nome_empresa = ? 
        WHERE id_filial = ?
      `;

      db.run(sqlAtualizaFilial, [nome, tipo, status, created_at, endereco, nome_empresa, id_filial], function(err) {
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










// Inicia o servidor na porta 3001
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001'); // Mensagem no terminal indicando que o back está ativo e na porta 3001.
});
