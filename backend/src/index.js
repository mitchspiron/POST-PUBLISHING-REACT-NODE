import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./db/db.js"
import router from "./routes/index.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONT_SERVER,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
