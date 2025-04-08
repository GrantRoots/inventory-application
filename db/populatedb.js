#! /usr/bin/env node

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
VALUES  ('apple', 2.00, 'Best apples in the world', 50)

INSERT INTO toys (name, price, description, quantity) 
VALUES  ('Toy Car', 40.00, 'Toy racecar', 10)

INSERT INTO electronics (name, price, description, quantity) 
VALUES  ('Xbox', 300.00, 'Xbox series S - NEW', 5)
`;

const ROLE_NAME = process.env.ROLE_NAME;
const ROLE_PASSWORD = process.env.ROLE_PASSWORD;
async function main() {
  const client = new Client({
    connectionString: `postgresql://${ROLE_NAME}:${ROLE_PASSWORD}@localhost:5432/messages`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
}
main();
