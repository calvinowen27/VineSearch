import express from 'express';
import { config } from 'dotenv';
import { executeCrudOperations } from './main.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from 'body-parser';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, function (req, res) {
  console.log("Server is running on port " + PORT);
});

app.post('/clicked', (req, res) => {
  var text = req.body.testinput;
  console.log(req.body);
  //console.log(req.headers.host);
  //executeCrudOperations();
  res.writeHead(301, {Location: req.headers.host});
  res.end();
  res.send();
});