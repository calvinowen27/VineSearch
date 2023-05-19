import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://admin:adminpass1@vinesearch.2irg5rg.mongodb.net/?retryWrites=true&w=majority";

export async function connectToCluster() {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Connection to MongoDB Atlas successful.');
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed: ', error);
        process.exit();
    }
 }

 // uploads doc to database
export async function dbUpload(doc) {
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster();
        const db = mongoClient.db('VineSearch');
        const collection = db.collection('Vines');

        // check if videoID already present in database
        let numDocs = await collection.countDocuments({videoID: doc.videoID});

        if(numDocs == 0) { // if not present then add it
            await collection.insertOne(doc);
        }
        console.log('Successfully added video to database with video ID ' + doc.videoID);
    } catch (error) {
        console.error('Failed to add video to database: ', error);
    } finally {
        await mongoClient.close(); // always close client when done accessing database
    }
}

// returns all documents present in database
// used for browse page
export async function dbGetAll() {
    let mongoClient;
    let docs;
 
    try {
        mongoClient = await connectToCluster();
        const db = mongoClient.db('VineSearch');
        const collection = db.collection('Vines');
        docs = await collection.find().toArray(); // find() all docs, convert to array
    } finally {
        await mongoClient.close();
    }

    return docs;
}

// search for documents that match query with keyword search
// returns arrayo f docs that matches search query
export async function dbSearch(query) {
    let mongoClient;
    let docs;
 
    try {
        mongoClient = await connectToCluster();
        const db = mongoClient.db('VineSearch');
        const collection = db.collection('Vines');

        var searchArray = []; // each element holds a keyword

        // build searchArray from query
        query.split(' ').forEach(element => {
            searchArray.push(JSON.parse(`{ "keywords": "${element}" }`)); // each element in searchArray is a json object
        });

        // find all docs that match search
        // want to sort by descending relevance but haven't figured that out yet
        docs = await collection.find({ $or: searchArray }).toArray();
    } finally {
        await mongoClient.close();
    }

    return docs;
}