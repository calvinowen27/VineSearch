import express from 'express';
import { dbUpload, dbGetAll, dbSearch } from '../lib/db/db-handler.js';
import { fileURLToPath } from 'url';
import * as path from 'path';
import bodyParser from 'body-parser';

// to make it easier to access files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootdir = path.join(__dirname, '../');

const PORT = 3000; // random port

const app = express(); // start app

// config app
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

// submit upload form --> calls db-handler function
app.post('/submit-upload', function(req, res) {
  dbUpload(req.body);
});

// browse
app.get('/browse', function (req, res) {
  res.sendFile(rootdir + 'lib/routes/browse/browse.html');
});

// get all docs from database for browse page -> calls db-handler function
app.get('/browse-get', function (req, res) {
  var docs = dbGetAll();
  docs.then((value) => {
    if(value != null) {
      res.status(200).json(value); // 200 means good
    } else {
      res.status(201).end(); // 201 means no docs in database
    }
  });
});

var searchDocs; // holds all docs returned by search

// search
app.get('/search', function(req, res) {
  searchDocs = dbSearch(req.url.split('query=')[1].split('+').join(' ')); // perform search with query from url

  // sending page file here so can't send search results also
  res.sendFile(rootdir + 'lib/routes/search/search.html');
});

// get search results
app.get('/search-get', function(req, res) {
  searchDocs.then((value) => {
    if(value != null) {
      res.status(200).json(value); // 200 means good, send search results as json
    } else {
      res.status(201).end(); // 201 means bad
    }
  });
});

// so we know site is up
app.listen(PORT, function (req, res) {
  console.log("Server is running on port " + PORT);
});