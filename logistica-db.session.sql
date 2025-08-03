SELECT * FROM Usuario_Sistema;
SELECT * FROM Empresa;

ALTER TABLE Usuario_Sistema MODIFY permissao =  VARCHAR(30);
UPDATE Usuario_Sistema SET permissao = 'Nível 3' WHERE id_usuario = 3;
DELETE FROM Empresa WHERE id = 4;
DELETE FROM Empresa WHERE id = 5;
DELETE FROM Empresa WHERE id = 6;
DELETE FROM Empresa WHERE id = 12;
DELETE FROM Empresa WHERE id = 10;

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