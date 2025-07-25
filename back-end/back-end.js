/*--ARQUIVO PRINCIPAL BACK-END--*/

// Importa os módulos necessários
const express = require('express'); // Framework para criar o servidor web (rotas HTTP)
const cors = require('cors'); // Middleware que libera o acesso ao servidor vindo de outros domínios (como o front-end React ou Next.js)
const sqlite3 = require('sqlite3').verbose(); // Importa SQLite com logs mais completos para depuração


// Inicializa a aplicação Express
const app = express();
app.use(cors()); // Ativa o CORS para evitar bloqueio do navegador ao consumir a API.

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
      res.status(500).send('Erro ao buscar Empresa'); // Retorna erro para o front-end atraves do status 500.
    } else {
      res.json(rows); // Retorna os resultados em formato JSON para o front-end.
    }
  });
});


// Configura o middleware para analisar o corpo da requisição como JSON
app.use(express.json()); // Para receber JSON no corpo da requisição

// Inicia o servidor na porta 3001
app.listen(3001, () => { // Inicia o servidor na porta 3001.
  console.log('Servidor rodando na porta 3001'); // Mensagem no terminal indicando que o back está ativo e na porta 3001.
});


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


// ------------------------------------------------------------------------------------


