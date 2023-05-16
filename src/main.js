import {MongoClient} from 'mongodb';
//const MongoClient = require('mongodb');

export async function connectToCluster(uri) {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
 
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }

 export async function executeCrudOperations() {
    const uri = "mongodb+srv://admin:adminpass1@vinesearch.2irg5rg.mongodb.net/?retryWrites=true&w=majority";
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster(uri);
        const db = mongoClient.db('VineSearch');
        const collection = db.collection('Vines');

        console.log('CREATE doc');
        await createDocument(collection);
    } finally {
        await mongoClient.close();
    }
 }

 export async function createDocument(collection) {
    const doc = {
        name : 'test doc name',
        url : 'test doc url'
    };

    await collection.insertOne(doc);
 }