import express from 'express';
import { config } from 'dotenv';
import { dbUpload, dbGetAll, dbSearch } from '../lib/db/db-handler.js';
import { fileURLToPath } from 'url';
import { Image } from 'image-js';
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

app.post('/submit-upload', function(req, res) {
  dbUpload(req.body);
});

// browse
app.get('/browse', function (req, res) {
  res.sendFile(rootdir + 'lib/routes/browse/browse.html');
});

app.get('/browse-get', function (req, res) {
  var docs = dbGetAll();
  docs.then((value) => {
    if(value != null) {
      res.status(200).json(value);
    } else {
      res.status(201).end();
    }
  });
});

var searchDocs;

// search
app.get('/search', function(req, res) {
  searchDocs = dbSearch(req.url.split('query=')[1].split('+').join(' '));
  res.sendFile(rootdir + 'lib/routes/search/search.html');
});

app.get('/search-get', function(req, res) {
  searchDocs.then((value) => {
    if(value != null) {
      res.status(200).json(value);
    } else {
      res.status(201).end();
    }
  });
});

app.listen(PORT, function (req, res) {
  console.log("Server is running on port " + PORT);
});