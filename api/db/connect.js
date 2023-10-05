import { MongoClient } from "mongodb";
import { loadEnv } from "vite";

export async function myConnect(){
    const env = loadEnv("development", process.cwd(), "VITE")
    const connect = JSON.parse(env.VITE_MY_CONNECT)
    try {
        const uri = `mongodb+srv://${connect.user}:${connect.password}@cluster0.oj8cvn0.mongodb.net/${connect.dbName}`;
        const client = await new MongoClient(uri).connect();
        return client.db()
    } catch (error) {
        return {status:500, message:"Database connection error"}
    }
}