
Create database if not exists sqoin;

CREATE TABLE if not exists article (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

INSERT INTO article (name) VALUES
  ('Article 1'),
  ('Article 2'),
  ('Article 3'),
  (' bacem '),
  ('Article 5'),
  ('Article 6'),
  ('Article 7'),
  ('Article 8'),
  ('Article 9'),
  ('Article 10');