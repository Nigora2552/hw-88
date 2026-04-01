import express from "express"
import  mongoose from "mongoose";
import  cors from "cors";
import config from "./config";


const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'))
app.use(express.json());


const run = async () => {
    await mongoose.connect(config.db);


    console.log(" Server running on port ", port);

    process.on("exit", () => {
        mongoose.disconnect()
    })
};

run().catch(error => console.error(error));