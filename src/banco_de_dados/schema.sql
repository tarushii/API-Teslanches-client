CREATE DATABASE TESLANCHES;

CREATE TABLE categoria(
  id SERIAL NOT NULL primary key,
  nome varchar(30) NOT NULL
);

INSERT INTO categoria (nome)
VALUES
('Diversos'),
('Lanches'),
('Carnes'),
('Massas'),
('Pizzas'),
('Japonesa'),
('Chinesa'),
('Mexicano'),
('Brasileira'),
('Italiana'),
('Árabe')

CREATE TABLE usuario(
  id SERIAL NOT NULL primary key,
  nome varchar(100) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  senha text NOT NULL
);

CREATE TABLE restaurante(
id SERIAL NOT NULL primary key,
  usuario_id int NOT NULL references usuario(id),
  nome varchar(50) NOT NULL,
  descricao varchar(100),
  imagem_restaurante TEXT,
  categoria_id int NOT NULL references categoria(id),
  taxa_entrega int NOT NULL DEFAULT(0),
  tempo_entrega_minutos int NOT NULL DEFAULT(30),
  valor_minimo_pedido int NOT NULL DEFAULT(0)
);

CREATE TABLE produto(
  id SERIAL NOT NULL primary key,
  restaurante_id int NOT NULL references restaurante(id),
  nome varchar(50) NOT NULL,
  descricao varchar(100),
  imagem_produto TEXT,
  preco int NOT NULL,
  ativo boolean NOT NULL DEFAULT(TRUE),
  permite_observacoes boolean NOT NULL DEFAULT(FALSE)
);

CREATE TABLE consumidor(
  id SERIAL NOT NULL PRIMARY KEY,
  nome_usuario TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone NUMERIC NOT NULL,
  senha JSON NOT NULL
)

CREATE TABLE endereco(
  id SERIAL NOT NULL PRIMARY KEY,
  usuario_id INT NOT NULL,
  cep NUMERIC NOT NULL,
  endereco TEXT NOT NULL,
  complemento TEXT NOT NULL
)

CREATE TABLE pedido(
  id SERIAL NOT NULL PRIMARY KEY,
  restaurante_id INT NOT NULL REFERENCES restaurante(id),
  usuario_id INT NOT NULL REFERENCES usuario(id),
  valor_produtos INT NOT NULL,
  taxa_entrega INT NOT NULL REFERENCES restaurante(taxa_entrega),
  valor_total INT NOT NULL,
  endereco_entrega TEXT NOT NULL,
  carrinho JSON NOT NULL
);