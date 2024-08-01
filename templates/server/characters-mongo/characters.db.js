import { MongoClient, ObjectId } from "mongodb";

const DB_INFO = {
    host: process.env.CONNECTION_STRING,
    db: process.env.DB_NAME,
    collection: 'Characters'
}

export async function getCharacters(query = {}, projection = {}) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.collection).find(query, { projection }).toArray();
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

export async function addCharacter(character) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.collection).insertOne(character);
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

export async function updateDoc(id, character) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.collection).updateOne(
            { _id: new ObjectId(id) },
            { $set }
        );
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

export async function getDocCount(query = {}) {
    let mongo = new MongoClient(DB_INFO.host);
    try {
        await mongo.connect();
        return await mongo.db(DB_INFO.db).collection(DB_INFO.collection).countDocuments(query);
    } catch (error) {
        throw error;
    }
    finally {
        mongo.close();
    }
}

