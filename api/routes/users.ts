import express from "express";
import {Error} from "mongoose";
import User from "../models/User";

const usersRouter = express.Router();


usersRouter.get('/',async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        next(e)
    }
})

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });

        user.generateAuthToken();

        await user.save();
        res.send({message: 'User registered successfully!', user})
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error)
        }
        next(error);
    }
});

usersRouter.post('/sessions', async (req, res) => {

    const user = await User.findOne({username: req.body.username})
    if (!user) return res.status(400).send({error: 'Username not found'});

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) return res.status(400).send({error: 'Invalid password'});

    user.generateAuthToken();
    await user.save();

    res.send({message: 'Logged in successfully', user});
});


export default usersRouter