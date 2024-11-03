CREATE DATABASE financas;
USE financas;

SELECT * FROM transacao;

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

CREATE TABLE tipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL
);

CREATE TABLE transacao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL,
    tipo INT,
    categoria INT,
    FOREIGN KEY (categoria) REFERENCES categorias(id) ON DELETE SET NULL,
    FOREIGN KEY (tipo) REFERENCES tipos(id) ON DELETE SET NULL
);

INSERT INTO tipos (descricao) VALUES 
('Receita'), 
('Despesa');

INSERT INTO categorias (descricao) VALUES 
('Aluguel'), 
('Pagamento'), 
('Prolabore'),
('Outros');

-- INSERT para popular o banco
INSERT INTO transacao (valor, data, tipo, categoria) VALUES 
(1000.00, '2023-10-31', '1', 2),
(-1500.00, '2023-10-01', '2', 1),
(2500.00, '2023-10-01', '2', 3),
(-4500.00, '2023-10-01', '2', 4),
(-1500.00, '2023-10-01', '2', 1);