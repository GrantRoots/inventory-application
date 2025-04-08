#! /usr/bin/env node

console.log("Populating db...");

require("dotenv").config();
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS food (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  price DECIMAL(6,2),
  description VARCHAR(255),
  quantity INTEGER
);

CREATE TABLE IF NOT EXISTS toys (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  price DECIMAL(6,2),
  description VARCHAR(255),
  quantity INTEGER
);

CREATE TABLE IF NOT EXISTS electronics (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  price DECIMAL(6,2),
  description VARCHAR(255),
  quantity INTEGER
);

INSERT INTO food (name, price, description, quantity) 
VALUES  ('Apple', 2.00, 'Best apples in the world', 50),
('Banana', 3.00, 'Best bananas ever made', 30),
('Orange', 2.50, 'Local organic oranges', 40);

INSERT INTO toys (name, price, description, quantity) 
VALUES  ('Toy Car', 40.00, 'Toy racecar', 10),
('Legos', 50.00, 'Harry potter house lego set', 2),
('Stuffed animal', 25.00, 'Soft fluffy bear stuffed animal', 5);

INSERT INTO electronics (name, price, description, quantity) 
VALUES  ('Xbox', 300.00, 'Xbox series S - NEW', 5),
('Playstation', 400.00, 'Playstation 5 - NEW', 3),
('Drone', 600.00, 'Flys 1000ft in the air - use with percaution', 1);
`;

const ROLE_NAME = process.env.ROLE_NAME;
const ROLE_PASSWORD = process.env.ROLE_PASSWORD;
async function main() {
  const client = new Client({
    connectionString: `postgresql://${ROLE_NAME}:${ROLE_PASSWORD}@localhost:5432/inventory`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}
main();
