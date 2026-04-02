import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {imagesUpload} from "../middleware/multer";
import Post from "../models/Post";
import {Error} from "mongoose"

const postsRouter = express.Router();

postsRouter.get('/', async (_req,res,next) => {
    try{
        const posts = await Post.find().populate("user", "username").sort({createdAt: -1});
        res.send(posts);
    }catch (e) {
        next(e)
    }
});

postsRouter.get('/:id', async (req,res,next) => {
    try{
        const {id} = req.params;

        const post = await Post.findById(id).populate("user", "username");
        res.send(post);
    }catch (e) {
        next(e)
    }
});



postsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {

    const {user} = req as RequestWithUser;

    const newPost = new Post({
        user: user._id.toString(),
        title: req.body.title,
        description: req.body.description,
        image: req.file ? 'images/' + req.file.filename : null,
    });

    try {
        await newPost.save();
        res.send(newPost);

    } catch (e) {
        if (e instanceof Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e)
    }
})


export default postsRouter;