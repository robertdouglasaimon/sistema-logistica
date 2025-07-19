SELECT * FROM Usuario_Sistema;

ALTER TABLE Usuario_Sistema MODIFY permissao =  VARCHAR(30);

UPDATE Usuario_Sistema SET permissao = 'Nível 3' WHERE id_usuario = 3;