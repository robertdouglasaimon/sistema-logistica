import sqlite3

conn = sqlite3.connect('banco-dados/logistica-db.db')

# Criando as tabelas:

# Tabela Empresa
conn.execute("""
    CREATE TABLE IF NOT EXISTS Empresa (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        cnpj VARCHAR(14) NOT NULL,
        telefone VARCHAR(11) NOT NULL,
        endereco VARCHAR(100) NOT NULL
    );
""")


# Tabela Filial
conn.execute("""
    CREATE TABLE IF NOT EXISTS Filial (
        id_filial INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        id_empresa INTEGER NOT NULL,
        nome VARCHAR(100) NOT NULL,
        tipo VARCHAR(100) NOT NULL,
        FOREIGN KEY (id_empresa) REFERENCES Empresa (id)
    );
""")

# Tabela Funcionário
conn.execute("""
    CREATE TABLE IF NOT EXISTS Funcionario (
        id_funcionario INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        nome VARCHAR(100) NOT NULL,
        cpf VARCHAR(11) NOT NULL,
        id_filial INTEGER NOT NULL,
        
        FOREIGN KEY(id_filial) REFERENCES Filial (id_filial)
    );
""")

# Tabela Produto
conn.execute("""
    CREATE TABLE IF NOT EXISTS Produto (
        id_produto INTEGER PRIMARY KEY NOT NULL,
        descricao VARCHAR(100) NOT NULL,
        unidade_medida VARCHAR(100) NOT NULL,
        categoria VARCHAR(100) NOT NULL,
        validade VARCHAR(100) NOT NULL,
        temperatura_ideal VARCHAR(100) NOT NULL
    );
""")

# Tabela Estoque
conn.execute(""" 
    CREATE TABLE IF NOT EXISTS Estoque (
        id_estoque INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        id_filial INTEGER NOT NULL,
        id_produto INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        localizacao VARCHAR(100) NOT NULL,
        atualizacao_em VARCHAR(100) NOT NULL,
        
        FOREIGN KEY (id_filial) REFERENCES Filial (id_filial),
        FOREIGN KEY (id_produto) REFERENCES Produto (id_produto)
    );             
""")

# Tabela Cliente
conn.execute(""" 
    CREATE TABLE IF NOT EXISTS Cliente (
        id_cliente INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        nome VARCHAR(100) NOT NULL,
        cnpj VARCHAR(14) NOT NULL,
        tipo VARCHAR(100) NOT NULL,
        endereco VARCHAR(100) NOT NULL
    );
""")

# Tabela Usuário Do Sistema
conn.execute(""" 
    CREATE TABLE IF NOT EXISTS Usuario_Sistema(
        id_usuario INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        nome VARCHAR(100) NOT NULL,
        login VARCHAR(100) NOT NULL,
        senha_hash VARCHAR(100) NOT NULL,
        perfil VARCHAR(100) NOT NULL
    );
""")


# Tabela Fornecedor
conn.execute(""" 
    CREATE TABLE IF NOT EXISTS Fornecedor (
        id_fornecedor INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        nome VARCHAR(100) NOT NULL,
        cnpj VARCHAR(14) NOT NULL,
        contato VARCHAR(100) NOT NULL,
        endereco VARCHAR(100) NOT NULL
    );
""")

# Tabela Pedido_Entrada
conn.execute(""" 
    CREATE TABLE IF NOT EXISTS Pedido_Entrada (
        id_pedido INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        id_fornecedor INTEGER NOT NULL,
        data_recebimento DATE NOT NULL,
        status VARCHAR(100) NOT NULL,
        
        FOREIGN KEY (id_fornecedor) REFERENCES
        Fornecedor (id_fornecedor)
    );
""")

# Tabela Item_Pedido
conn.execute(""" 
    CREATE TABLE IF NOT EXISTS Item_Pedido (
        id_item INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        id_pedido INTEGER NOT NULL,
        id_produto INTEGER NOT NULL,
        quantidade INTEGER NOT NULL,
        preco_unitario DECIMAL(10, 2) NOT NULL,
        
        FOREIGN KEY (id_pedido) REFERENCES
        Pedido_Entrada (id_pedido),
        FOREIGN KEY (id_produto) REFERENCES
        Produto (id_produto)
    );
""")

# Tabela Pedido_Saida
conn.execute(""" 
    CREATE TABLE IF NOT EXISTS Pedido_Saida (
        id_pedido INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        id_cliente INTEGER NOT NULL,
        data_entrega DATE NOT NULL,
        status VARCHAR(100) NOT NULL,
        
        FOREIGN KEY (id_cliente) REFERENCES
        Cliente (id_cliente)
    );
""")

# Tabela Viagem
conn.execute(""" 
    CREATE TABLE IF NOT EXISTS Viagem (
        id_viagem INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        id_veiculo VARCHAR(100) NOT NULL,
        id_motorista VARCHAR(100) NOT NULL,
        id_pedido_saida INTEGER NOT NULL,
        data_saida DATE NOT NULL,
        data_chegada DATE NOT NULL,
        
        FOREIGN KEY (id_veiculo) REFERENCES Veiculo (id_veiculo),
        FOREIGN KEY (id_motorista) REFERENCES Motorista (id_motorista),
        FOREIGN KEY (id_pedido_saida) REFERENCES Pedido_Saida (id_pedido)
    );
""")

# Tabela Veiculo
conn.execute(""" 
    CREATE TABLE IF NOT EXISTS Veiculo (
        id_veiculo INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        placa VARCHAR(50) NOT NULL,
        tipo VARCHAR(50) NOT NULL,
        capacidade VARCHAR(50) NOT NULL
    );
""")

# Tabela Motorista
conn.execute(""" 
    CREATE TABLE IF NOT EXISTS Motorista (
        id_motorista INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        nome VARCHAR(100) NOT NULL,
        cpf VARCHAR(11) NOT NULL,
        cnh VARCHAR(15) NOT NULL,
        categoria VARCHAR(11) NOT NULL
    );
""")

conn.commit()
conn.close()