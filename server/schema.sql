CREATE DATABASE IF NOT EXISTS alma DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alma;

-- Contatos enviados pelo site
CREATE TABLE IF NOT EXISTS contatos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  mensagem TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projetos exibidos na página (opcional para agora; já deixei pronto)
CREATE TABLE IF NOT EXISTS projetos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(160) NOT NULL,
  imagem VARCHAR(255) NOT NULL,     -- ex.: /projetos/sopa.png
  link   VARCHAR(255) DEFAULT '#',
  ordem  INT DEFAULT 0,
  ativo  TINYINT(1) DEFAULT 1
);

-- Carga inicial (ajuste caminhos se quiser)
INSERT INTO projetos (titulo, imagem, link, ordem, ativo) VALUES
('Projeto Crê.Ser',      '/projetos/creSer.png',          '#', 1, 1),
('Assistência à mães',   '/projetos/assistenciaMaes.png', '#', 2, 1),
('Projeto Alimentar',    '/projetos/sopa.png',            '#', 3, 1),
('Natal de Amor',        '/projetos/natalAmor.png',       '#', 4, 1);
