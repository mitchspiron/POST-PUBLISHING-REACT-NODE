import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./db/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import { upload } from "./utils/multer.js";
import { join } from "path";

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONT_SERVER,
  credentials: true,
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.URL_FRONT);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/", router);

app.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/images", express.static(join(process.cwd(), "src/uploads/images")));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
