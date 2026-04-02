import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import Post from "../models/Post";
import mongoose, {Error} from "mongoose"
import Comment from "../models/Comments";

const commentsRouter = express.Router();

commentsRouter.get('/', async (_req,res,next) => {
    try{
        const comments = await Comment.find().populate("user", "username");
        res.send(comments);
    }catch (e) {
        next(e)
    }
});


commentsRouter.post('/', auth , async (req, res, next) => {

    const {user} = req as RequestWithUser;

    const postId = req.body.post;
    const postExist = await Post.findById(postId);
    if (!postExist)  res.status(404).send({ error: 'Post not found' });


    const newComment = new Comment({
        user: user._id.toString(),
        post: postExist,
        description: req.body.description,
    });

    try {
        await newComment.save();
        res.send(newComment);

    } catch (e) {
        if (e instanceof Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e)
    }
});
commentsRouter.delete('/:id', async (req,res,next) => {
    try{
        const {id} = req.params;
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if(!id || !isValid) return res.status(400).send({error: 'Id must be provided in params'})

        await Comment.findByIdAndDelete(id);
        res.send({message: 'Comment deleted successfully'});

    }catch (e) {
        next(e)
    }
});


export default commentsRouter;