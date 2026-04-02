import express from "express"
import  mongoose from "mongoose";
import  cors from "cors";
import config from "./config";
import usersRouter from "./routes/users";
import dotenv from "dotenv";
import postsRouter from "./routes/posts";


const app = express();
const port = 8000;

dotenv.config();
app.use(cors());
app.use(express.static('public'))
app.use(express.json());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);


const run = async () => {
    await mongoose.connect(config.db);

  app.listen(port , () => {
      console.log(" Server running on port ", port);
  })

    process.on("exit", () => {
        mongoose.disconnect()
    })
};

run().catch(error => console.error(error));