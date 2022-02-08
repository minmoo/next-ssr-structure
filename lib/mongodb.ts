/*
import * as mongoDB from "mongodb";
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

if (!MONGODB_URI) {
	throw new Error("Please add your Mongo URI to .env.local");
}

if (!MONGODB_DB) {
	throw new Error("Please add your Mongo Database to .env.local");
}

let cachedClient: mongoDB.MongoClient | null = null;
let cachedDb: mongoDB.Db | null = null;

export async function connectToDatabase() {
	//check the cached
	if (cachedClient && cachedDb) {
		//load from cache
		return {
			client: cachedClient,
			db: cachedDb,
		};
	}

	// set the connection options
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	// Connect to cluster
	const client = new mongoDB.MongoClient(MONGODB_URI as string, options as any);
	await client.connect();
	const db = client.db(MONGODB_DB);

	// set cache
	cachedClient = client;
	cachedDb = db;

	return {
		client: cachedClient,
		db: cachedDb,
	};
}
*/
export {};
