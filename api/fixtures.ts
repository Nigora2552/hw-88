import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import {randomUUID} from "crypto";
import Post from "./models/Post";
import Comment from "./models/Comments";

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

    const [userAlisa, userJone] = await User.create(
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

    const [post1, post2] = await Post.create(
        {
            user: userAlisa!._id,
            title: 'Post 1',
            description: 'Post text 1 user1',
            image: null,
        },

        {
            user: userJone!._id,
            title: 'Post 2',
            description: 'Post text 1 user2',
            image: null,
        },

    );

    await Comment.create(
        {
            user: userJone!._id,
            post: post1!._id,
            description: 'Comment 1 - Post text 1 user1',
        },
        {
            user: userJone!._id,
            post: post1!._id,
            description: 'Comment 2 - Post text 1 user1',
        },
        {
            user: userJone!._id,
            post: post2!._id,
            description: 'Comment 1 - Post text 1 user2',
        },
        {
            user: userJone!._id,
            post: post2!._id,
            description: 'Comment2  - Post text 1 user2',
        },
    )


    await db.close()
}

run().catch(err => console.error(err))