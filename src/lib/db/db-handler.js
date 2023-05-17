import {MongoClient} from 'mongodb';

export async function connectToCluster() {
    const uri = "mongodb+srv://admin:adminpass1@vinesearch.2irg5rg.mongodb.net/?retryWrites=true&w=majority";
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
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster();
        const db = mongoClient.db('VineSearch');
        const collection = db.collection('Vines');

        console.log('CREATE doc');
        await createDocument(collection);
    } finally {
        await mongoClient.close();
    }
 }

//  export async function createDocument(collection) {
//     const doc = {
//         name : 'test doc name',
//         url : 'test doc url'
//     };

//     await collection.insertOne(doc);
//  }

export async function dbUpload(doc) {
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster();
        const db = mongoClient.db('VineSearch');
        const collection = db.collection('Vines');
        await collection.insertOne(doc);
    } finally {
        await mongoClient.close();
    }
}

export async function dbGetRandom() {
    let mongoClient;
    let result;
 
    try {
        mongoClient = await connectToCluster();
        const db = mongoClient.db('VineSearch');
        const collection = db.collection('Vines');
        result = await collection.findOne({});
    } finally {
        await mongoClient.close();
    }

    return result;
}

export async function dbGetAll() {
    let mongoClient;
    let result;
 
    try {
        mongoClient = await connectToCluster();
        const db = mongoClient.db('VineSearch');
        const collection = db.collection('Vines');
        result = await collection.find().limit(10).toArray();
    } finally {
        await mongoClient.close();
    }

    return result;
}

 export async function dbClear(string) {
    let mongoClient;
 
    try {
        mongoClient = await connectToCluster();
        const db = mongoClient.db('VineSearch');
        const collection = db.collection('Vines');
        await collection.deleteMany({});
    } finally {
        await mongoClient.close();
    }
 }