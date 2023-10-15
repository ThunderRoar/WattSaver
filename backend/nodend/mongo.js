import {MongoClient} from "mongodb";
import 'dotenv/config';

const uri = process.env.MONGO_CONNECT_STRING;
const mongoDatabase = process.env.MONGO_DATABASE;

export async function mongoQueryOne(queryKey, queryValue, mongoCollection) {
    const client = new MongoClient(uri);
    let queryResult = "Error in query";
    try {
        const database = client.db(mongoDatabase);
        const collection = database.collection(mongoCollection);
        const query = { [queryKey]: queryValue };
        queryResult = await collection.findOne(query);
    } catch(err) {
        queryResult = err.message;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
        return queryResult;
    }
}