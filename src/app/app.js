import express from 'express';
import { config } from 'dotenv';
import { dbClear, dbUpload, dbGetRandom, dbGetAll } from '../lib/db/db-handler.js';
import { fileURLToPath } from 'url';
import * as path from 'path';
import bodyParser from 'body-parser';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootdir = path.join(__dirname, '../');

var id = 'lNB9D-rJWc4';

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
  var videos = dbGetAll();
  videos.then((value) => {
    if(value != null) {
      res.status(200).json(value);
    } else {
      res.status(201).end();
    }
  });
});

// search
app.get('/search', function(req, res) {
  res.sendFile(rootdir + 'lib/routes/search/search.html');
  dbClear();
});

// get-id
app.get('/get-id', function(req, res) {
  var rand = dbGetRandom();
  rand.then((value) => {
    if(value != null) {
      res.status(200).send(value.videoID);
    } else {
      res.status(200).send(id);
    }
  });
});

app.listen(PORT, function (req, res) {
  console.log("Server is running on port " + PORT);
});