SELECT * FROM Usuario_Sistema;
SELECT * FROM Empresa;
SELECT * FROM Filial;
SELECT * FROM Funcionario;

PRAGMA table_info(Filial);

/* Tabela Usuario_Sistema - Modificando */
ALTER TABLE Usuario_Sistema MODIFY permissao =  VARCHAR(30);
UPDATE Usuario_Sistema SET permissao = 'Nível 3' WHERE id_usuario = 3;

/* Tabela Empresa - Deletando */
DELETE FROM Empresa WHERE id = 4;
DELETE FROM Empresa WHERE id = 5;


/* Tabela Empresa - Modificando */
ALTER TABLE Empresa ADD COLUMN email VARCHAR(255);

/* Tabela Empresa - Criando */
CREATE TABLE Empresa (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cnpj VARCHAR(20) NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    email VARCHAR(100),
    status VARCHAR(20) DEFAULT 'Ativa',
    razao_social VARCHAR(255) NOT NULL UNIQUE
);

/* Tabela Empresa - Inserindo dados */
INSERT INTO Empresa (cnpj, telefone, endereco, email, status, razao_social) VALUES
('12.345.678/0001-99', '(11) 99999-1111', 'Av. Brasil, 1000 - SP', 'contato@logtrans.com.br', 'Ativa', 'LogTrans Brasil S.A.'),
('98.765.432/0001-11', '(21) 98888-2222', 'Rua das Laranjeiras, 200 - RJ', 'atendimento@cargasexpress.com', 'Ativa', 'Cargas Express Ltda.'),
('11.222.333/0001-55', '(41) 97777-3333', 'Av. das Indústrias, 300 - PR', 'suporte@multilog.com.br', 'Ativa', 'MultiLogística ME');


UPDATE Empresa SET razao_social = 'Loja Exemplo A' WHERE id = 1;

UPDATE Empresa SET id = 1 WHERE id = 1;

/*--------------------------------------------------*/

/* Tabela Filial - Modificando */

SELECT * FROM Filial;

ALTER TABLE Filial ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'Ativa';
ALTER TABLE Filial ADD COLUMN created_at DATETIME;
ALTER TABLE Filial ADD COLUMN endereco VARCHAR(255);

/* Quando precisa criar uma coluna nova e relacionar em uma outra tabela */
-- 1. Adiciona a coluna
ALTER TABLE Filial 
ADD COLUMN nome_empresa VARCHAR(255);
-- 2. Cria a chave estrangeira
ALTER TABLE Filial 
ADD CONSTRAINT fk_nome_empresa 
FOREIGN KEY (nome_empresa) REFERENCES Empresa(razao_social);

ALTER TABLE Filial DROP COLUMN created_at;

DROP VIEW vw_FilialEmpresa;



/* Tabela Filial - Criando */
CREATE TABLE Filial (
    id_filial INTEGER PRIMARY KEY AUTOINCREMENT,
    id_empresa INTEGER,
    nome VARCHAR(255),
    tipo VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'Ativa',
    created_at DATETIME,
    endereco VARCHAR(255),
    nome_empresa VARCHAR(255),
    FOREIGN KEY (id_empresa) REFERENCES Empresa(id),
    FOREIGN KEY (nome_empresa) REFERENCES Empresa(razao_social)
);

/* Tabela Filial - Inserindo dados */
INSERT INTO Filial (id_empresa, nome, tipo, status, endereco, nome_empresa) VALUES
(1, 'Filial Zona Leste', 'Centro de Distribuição', 'Ativa', 'Rua A, 123 - São Paulo', 'LogTrans Brasil S.A.'),
(2, 'Filial Barra da Tijuca', 'HUB Regional', 'Ativa', 'Rua B, 456 - Rio de Janeiro', 'Cargas Express Ltda.'),
(3, 'Filial CIC', 'Armazenagem', 'Ativa', 'Rua C, 789 - Curitiba', 'MultiLogística ME');

/* Tabela Filial - JOIN para testes de integridade */
SELECT 
    f.nome AS nome_filial,
    f.tipo,
    f.status,
    f.created_at,
    e.razao_social,
    e.telefone,
    e.email
FROM Filial AS f
JOIN Empresa e ON f.id_empresa = e.id;

/* Tabela Filial - Criando VIEW para fazer uma tabela trackeada usando JOIN de Filial e Empresa */
CREATE VIEW vw_FilialEmpresa AS
SELECT 
    f.nome AS nome_filial,
    f.tipo,
    f.status,
    f.created_at,
    f.endereco AS endereco_filial,
    e.razao_social,
    e.telefone,
    e.email,
    e.endereco AS endereco_empresa
FROM Filial f
JOIN Empresa e ON f.id_empresa = e.id;

UPDATE Filial 
SET id_empresa = 1
WHERE id_empresa = NULL;

DELETE FROM Filial WHERE id_filial = 5;
DELETE FROM Filial WHERE id_filial = 6;

/*--------------------------------------------------*/

/* Tabela Funcionario - Modificando */
SELECT * FROM Funcionario;

/* Tabela Funcionario - Modificando */
ALTER TABLE Funcionario ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'Ativo';
ALTER TABLE Funcionario ADD COLUMN admissao DATETIME;
ALTER TABLE Funcionario ADD COLUMN demissao DATETIME;
ALTER TABLE Funcionario ADD COLUMN salario DECIMAL(10, 2);
ALTER TABLE Funcionario ADD COLUMN cargo VARCHAR(100);

/* DELETANDO UMA COLUNA EM Funcionario */
ALTER TABLE Funcionario DROP COLUMN demissao;

/* Tabela Funcionario - Modificando e adicionando dados */
UPDATE Funcionario
SET 
  status = 'Inativo',
  admissao = '2023-05-01 10:00:00'
WHERE id_funcionario = 1;

UPDATE Funcionario
SET 
  status = 'Ativo',
  admissao = '2021-05-01 09:24:12'
WHERE id_funcionario = 2;

UPDATE Funcionario
SET 
  status = 'Ativo',
  admissao = '2025-05-04 08:38:00'
WHERE id_funcionario = 3;



UPDATE Funcionario
SET 
  demissao = '2023-05-01 10:00:00',
  salario = '1500.00',
  cargo = 'Gerente'
WHERE id_funcionario = 1;

UPDATE Funcionario
SET 
  demissao = '0000-00-00 00:00:00',
  salario = '2500.00',
  cargo = 'Supervisor'
WHERE id_funcionario = 2;

UPDATE Funcionario
SET 
  demissao = '0000-00-00 00:00:00',
  salario = '3500.00',
  cargo = 'Motorista'
WHERE id_funcionario = 3;

DROP TABLE Empresa;
DROP TABLE Filial;