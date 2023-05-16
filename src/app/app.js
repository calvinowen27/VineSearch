import express from 'express';
import { config } from 'dotenv';
//import { executeCrudOperations } from './main.js';
import { fileURLToPath } from 'url';
import * as path from 'path';
import bodyParser from 'body-parser';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootdir = path.join(__dirname, '../');

const app = express();

const PORT = 3000;

app.use(express.static(rootdir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// root
app.get('/', function (req, res) {
  res.sendFile(rootdir + 'lib/routes/root/root.html');
});

// upload
app.get('/upload', function (req, res) {
  res.sendFile(rootdir + 'lib/routes/upload/upload.html');
});

app.post('/upload', function(req, res) {
  res.send();
});

app.post('/input', (req, res) => {
  var text = req.body.text;
  console.log(text);
  //console.log(req.headers.host);
  //executeCrudOperations();
  //res.writeHead(301, {Location: 'http://' + req.headers.host});
  res.end();
  res.send();
});

app.listen(PORT, function (req, res) {
  console.log("Server is running on port " + PORT);
});