-- schema_entrega.sql
-- ALMA - Schema e seeds (entrega 1)
-- Compatível com MySQL 8.x (Azure MySQL).

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET sql_mode = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE DATABASE IF NOT EXISTS almaa
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE almaa;

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(191) NOT NULL,
  senha_hash VARCHAR(255) NOT NULL,
  papel ENUM('admin','doador') NOT NULL DEFAULT 'doador',
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_usuarios_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS eventos;
CREATE TABLE eventos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descricao TEXT NULL,
  data DATE NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_eventos_data (data),
  KEY idx_eventos_titulo (titulo)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS atividades;
CREATE TABLE atividades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  descricao TEXT NULL,
  inicio DATETIME NULL,
  fim DATETIME NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS projetos;
CREATE TABLE projetos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(200) NOT NULL,
  descricao TEXT NULL,
  status ENUM('ativo','inativo') DEFAULT 'ativo',
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY idx_projetos_status (status),
  KEY idx_projetos_nome (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS contatos;
CREATE TABLE contatos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(191) NOT NULL,
  mensagem TEXT NOT NULL,
  criado_em TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY idx_contatos_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS doacoes;
CREATE TABLE doacoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NULL,
  valor DECIMAL(10,2) NOT NULL,
  data_doacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  referencia VARCHAR(100) NULL,
  CONSTRAINT fk_doacoes_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    ON DELETE SET NULL ON UPDATE CASCADE,
  KEY idx_doacoes_usuario (usuario_id),
  KEY idx_doacoes_data (data_doacao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DELETE FROM usuarios;
INSERT INTO usuarios (nome, email, senha_hash, papel) VALUES
  ('Administrador', 'admin@alma.org',  SHA2('admin123', 256),  'admin'),
  ('Doador Exemplo','doador@alma.org', SHA2('doador123', 256), 'doador');

INSERT INTO eventos (titulo, descricao, data) VALUES
  ('Campanha de Inverno', 'Arrecadação de agasalhos', '2025-06-10'),
  ('Mutirão da Saúde', 'Atendimento básico à comunidade', '2025-07-15');

INSERT INTO projetos (nome, descricao, status) VALUES
  ('Projeto Acolher', 'Acompanhamento familiar', 'ativo'),
  ('Projeto Ler+', 'Incentivo à leitura', 'ativo');
