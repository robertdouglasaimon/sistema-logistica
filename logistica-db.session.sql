SELECT * FROM Usuario_Sistema;
SELECT * FROM Empresa;
SELECT * FROM Filial;
SELECT * FROM Funcionario;

/* Tabela Usuario_Sistema - Modificando */
ALTER TABLE Usuario_Sistema MODIFY permissao =  VARCHAR(30);
UPDATE Usuario_Sistema SET permissao = 'Nível 3' WHERE id_usuario = 3;

/* Tabela Empresa - Deletando */
DELETE FROM Empresa WHERE id = 4;
DELETE FROM Empresa WHERE id = 5;


/* Tabela Empresa - Modificando */
ALTER TABLE Empresa ADD COLUMN email VARCHAR(255);
ALTER TABLE Empresa ADD COLUMN status VARCHAR(20);
ALTER TABLE Empresa ADD COLUMN razao_social VARCHAR(255);



/* Tabela Empresa - Modificando e adicionando dados */
UPDATE Empresa
SET 
  email = 'contato@transbrasil.com',
  status = 'Ativa'
WHERE id = 1;

UPDATE Empresa
SET 
  email = 'atendimento@logisolucao.com',
  status = 'Inativa'
WHERE id = 2;

UPDATE Empresa
SET 
  email = 'comercial@agilcargas.com',
  status = 'Ativa'
WHERE id = 3;


UPDATE Empresa SET razao_social = 'Loja Exemplo A' WHERE id = 1;
UPDATE Empresa SET razao_social = 'Distribuidora XYZ' WHERE id = 2;
UPDATE Empresa SET razao_social = 'Tech Solutions Ltda' WHERE id = 3;

/*--------------------------------------------------*/

/* Tabela Filial - Modificando */

SELECT * FROM Filial;

ALTER TABLE Filial ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'Ativa';
ALTER TABLE Filial ADD COLUMN created_at DATETIME;
ALTER TABLE Filial ADD COLUMN endereco VARCHAR(255);


/* Tabela Filial - Modificando e adicionando dados */
UPDATE Filial
SET 
  status = 'Inativa',
  created_at = '2023-05-01 10:00:00'
WHERE id_filial = 1;

UPDATE Filial
SET 
  status = 'Ativa',
  created_at = '2021-05-01 09:24:12'
WHERE id_filial = 2;

UPDATE Filial
SET 
  status = 'Ativa',
  created_at = '2025-05-04 08:38:00'
WHERE id_filial = 3;

UPDATE Filial
SET
  endereco = 'Rua Principal, 123'
WHERE id_filial = 1;

UPDATE Filial
SET
  endereco = 'Avenida Central, 456'
WHERE id_filial = 2;

UPDATE Filial
SET
  endereco = 'Praça da Liberdade, 789'
WHERE id_filial = 3;

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