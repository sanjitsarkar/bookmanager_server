import express from "express";
import cors from "cors"
import config from "./config";
import v1Router from "./routes/v1.router";
const app = express();

app.use(cors({
  origin: config.CLIENT_URL
}))

app.use(express.json())
app.use("/api/v1", v1Router)
export default app;