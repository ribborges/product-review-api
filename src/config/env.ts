import dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.MONGO_URI;
const appPort = process.env.PORT;
const clientURL = process.env.CLIENT_URL?.split(',') ?? [];

export { dbURI, appPort, clientURL };