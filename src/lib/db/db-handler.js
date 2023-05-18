import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://admin:adminpass1@vinesearch.2irg5rg.mongodb.net/?retryWrites=true&w=majority";

export async function connectToCluster() {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed: ', error);
        process.exit();
    }
 }

export async function dbUpload(doc) {
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster();
        const db = mongoClient.db('VineSearch');
        const collection = db.collection('Vines');
        await collection.insertOne(doc);
        console.log('Successfully added video to database with video ID ' + doc.videoID);
    } catch (error) {
        console.error('Failed to add video to database: ', error);
    } finally {
        await mongoClient.close();
    }
}

export async function dbGetAll(page) {
    let mongoClient;
    let docs;
    let numDocs;
 
    try {
        mongoClient = await connectToCluster();
        const db = mongoClient.db('VineSearch');
        const collection = db.collection('Vines');
        docs = await collection.find().skip((page - 1) * 2).limit(2).toArray();
        numDocs = await collection.countDocuments();
        docs.push({ numDocs: numDocs});
    } finally {
        await mongoClient.close();
    }

    return docs;
}