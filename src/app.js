import express from 'express';

import { config } from 'dotenv';
import { executeCrudOperations } from './main.js';

import * as bodyParse from 'body-parser';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

//import { config } from 'dotenv';
//import { executeCrudOperations } from './main.js';

config();
//executeCrudOperations();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function (req, res) {
  console.log("Server is running on localhost3000");

  //config();
  //executeCrudOperations();
});

app.post('/clicked', (req, res) => {
  executeCrudOperations();
  res.sendStatus(201);
});