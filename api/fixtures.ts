import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop')
    }

    await User.create(
        {
            username: 'Alisa',
            password: '123',
            token: randomUUID()
        },
        {
            username: 'Jone',
            password: '123',
            token: randomUUID()
        },
    )


    await db.close()
}

run().catch(err => console.error(err))