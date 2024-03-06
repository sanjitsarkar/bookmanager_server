import * as dotenv from 'dotenv';
import process from 'process'

dotenv.config();

export const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL
const CLIENT_URL = process.env.CLIENT_URL
const NODE_ENV = process.env.NODE_ENV



export default {
  PORT,
  MONGO_DB_URL,
  NODE_ENV,
  CLIENT_URL,
}