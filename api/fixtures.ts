import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";
import Post from "./models/Post";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('users');
        await db.dropCollection('post');
        await db.dropCollection('comments');
    } catch (e) {
        console.log('Collections were not present, skipping drop')
    }

    const [authorAlisa, JonePost] = await User.create(
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
    );

    await Post.create(
        {
            author: authorAlisa!._id,
            title: 'Post 1',
            description: 'Post text 1',
            image: null,
        },
        {
            author: authorAlisa!._id,
            title: 'Post 2',
            description: 'Post text 2',
            image: null,
        },
        {
            author: JonePost!._id,
            title: 'Post 1',
            description: 'Post text 1',
            image: null,
        },
        {
            author: JonePost!._id,
            title: 'Post 1',
            description: 'Post text 2',
            image: null,
        },
    )


    await db.close()
}

run().catch(err => console.error(err))