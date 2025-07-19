import sqlite3

conn = sqlite3.connect('banco-dados/logistica-db.db')

# Inserindo dados na tabela Empresa
# conn.execute("""
#     INSERT INTO Empresa (cnpj, telefone, endereco) VALUES
#         ('12345678901234', '1234567890', 'Rua A, 123'),
#         ('98765432109876', '9876543210', 'Rua B, 456'),
#         ('55555555555555', '5555555555', 'Rua C, 789');
# """)

# Inserindo dados na tabela Filial
# conn.execute("""
#     INSERT INTO Filial (id_empresa, nome, tipo) VALUES
#         (1, 'Amazon Brasil (Serviços de Logística e Fulfillment)', 'Filial'),
#         (2, 'JSL Logística (do grupo Simpar)', 'Filial'),
#         (3, 'FedEx Brasil', 'Filial');
# """)

# Inserindo dados na tabela Funcionário
# conn.execute("""
#     INSERT INTO Funcionario (id_filial, nome, cpf) VALUES
#         (1,'John Doe', '12345678901'),
#         (2,'Jane Doe', '98765432101'),
#         (3,'Bob Smith', '55555555555');
# """)

# Inserindo dados na tabela Produto
# conn.execute(""" 
#     INSERT INTO Produto (descricao, unidade_medida, categoria, validade, temperatura_ideal) VALUES
#         ('Carne Bovina Resfriada (FrigoSul)', 'kg', 'Carnes Resfriadas', '2025-09-15', 2.00),
#         ('Maçã Gala Orgânica (AgroVerde)', 'kg', 'Frutas Frescas', '2025-08-01', 6.00),
#         ('Pacote de Arroz 5kg (PetroPack)', 'un', 'Alimentos Secos', '2026-01-30', 25.00);
# """)

# Inserindo dados na tabela Estoque
# conn.execute(""" 
#     INSERT INTO Estoque (id_filial, id_produto, quantidade, localizacao, atualizacao_em) VALUES
#         (1, 1, 1000, 'Rack 1', '2023-06-01'),
#         (2, 2, 500, 'Rack 2', '2023-06-01'),
#         (3, 3, 200, 'Rack 3', '2023-06-01');
# """)

# Inserindo dados na tabela Clinte
# conn.execute (""" 
#     INSERT INTO Cliente (nome, cnpj, tipo, endereco) VALUES
#         ('Amazon Brasil (Serviços de Logística e Fulfillment)', '12345678901234', 'Filial', 'Rua A, 123'),
#         ('JSL Logística (do grupo Simpar)', '98765432109876', 'Filial', 'Rua B, 456'),
#         ('FedEx Brasil', '55555555555555', 'Filial', 'Rua C, 789');
# """)

# Inserindo dados na tabela Usuário Do Sistema
# conn.execute (""" 
#     INSERT INTO Usuario_Sistema (nome, login, senha_hash, perfil) VALUES
#         ('John Doe', 'jdoe', 'password123', 'admin'),
#         ('Jane Doe', 'jane', 'secret456', 'user'),
#         ('Bob Smith', 'bsmith', 'secure789', 'user');
# """)

# Inserindo dados na tabela Fornecedor
# conn.execute (""" 
#     INSERT INTO Fornecedor (nome, cnpj, contato, endereco) VALUES
#         ('Amazon Brasil (Serviços de Logística e Fulfillment)', '12345678901234', 'John Doe', 'Rua A, 123'),
#         ('JSL Logística (do grupo Simpar)', '98765432109876', 'Jane Doe', 'Rua B, 456'),
#         ('FedEx Brasil', '55555555555555', 'Bob Smith', 'Rua C, 789');
# """)

# Inserindo dados na tabela Pedido_Entrada
# conn.execute (""" 
#     INSERT INTO Pedido_Entrada (id_fornecedor, data_recebimento, status) VALUES
#         (1, '2023-06-01', 'Recebido'),
#         (2, '2023-06-01', 'Recebido'),
#         (3, '2023-06-01', 'Recebido');
# """)

# Inserindo dados na tabela Item_Pedido
# conn.execute (""" 
#     INSERT INTO Item_Pedido (id_pedido, id_produto, quantidade, preco_unitario) VALUES
#         (1, 1, 1000, 10.99),
#         (2, 2, 500, 5.99),
#         (3, 3, 200, 15.99);
# """)

# Inserindo dados na tabela Pedidos_Saida
# conn.execute (""" 
#     INSERT INTO Pedido_Saida (id_cliente, data_entrega, status) VALUES
#         (1, '2023-06-01', 'Enviado'),
#         (2, '2023-06-01', 'Enviado'),
#         (3, '2023-06-01', 'Enviado');         
# """)

# Inserindo dados na tabela Viagem
# conn.execute (""" 
#     INSERT INTO Viagem (id_veiculo, id_motorista, id_pedido_saida, data_saida, data_chegada) VALUES
#         (1, 1, 1, '2023-06-01', '2023-06-01'),
#         (2, 2, 2, '2023-06-01', '2023-06-01'),
#         (3, 3, 3, '2023-06-01', '2023-06-01');              
# """)

# Inserindo dados na tabela Veiculo
# conn.execute (""" 
#     INSERT INTO Veiculo (id_veiculo, placa, tipo, capacidade) VALUES
#         (1, 'ABC123', 'Caminhão', 1000),
#         (2, 'XYZ456', 'Caminhão', 500),
#         (3, 'DEF789', 'Caminhão', 200);
# """)

# Inserindo dados na tabela Motorista
# conn.execute (""" 
#     INSERT INTO Motorista (nome, cpf, cnh, categoria) 
#     VALUES
#     ('Maria Silva', '12345678901', '12345678901','D'),
#     ('Carlos Oliveira', '98765432109', '98765432109', 'C'),
#     ('Pedro Santos', '55555555555', '55555555555', 'B');
# """)



# Caso precise deletar alguma tabela, em caso de erro.
# conn.execute(""" 
#     DROP TABLE IF EXISTS "Nome_Tabela";
# """)
conn.commit()
conn.close()