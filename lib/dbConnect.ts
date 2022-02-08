import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) {
	throw new Error(
		"Please define the MONGODB_URI environment variable inside .env.local",
	);
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = (
	globalThis as typeof globalThis & { mongoose: { conn: any; promise: any } }
).mongoose;

if (!cached) {
	cached = (
		globalThis as typeof globalThis & { mongoose: { conn: any; promise: any } }
	).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	//중복 요청 막기 위해
	if (!cached.promise) {
		const opts = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			bufferCommands: false,
		};

		cached.promise = mongoose
			.connect(MONGODB_URI as string, opts)
			.then((mongoose) => {
				return mongoose;
			});
	}

	cached.conn = await cached.promise;
	return cached.conn;
}

export default dbConnect;

// let cachedDatabase: Mongoose.Connection;

// export const connect = async () => {
// 	if (cachedDatabase) {
// 		return {
// 			db: cachedDatabase,
// 		};
// 	}

// 	// set the connection options
// 	const options = {
// 		useNewUrlParser: true,
// 		useFindAndModify: true,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true,
// 	};
// 	const conn = await mongoose
// 		.connect(MONGODB_URI as string, options as any)
// 		.catch((err) => console.log(err));
// 	console.log("Mongoose Connection Established");

// 	//SCHEMA
// };
