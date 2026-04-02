import mongoose from "mongoose";


const CommentsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    description: {
        type: String,
        required: true
    },
});

const Comment = mongoose.model('Comment', CommentsSchema);
export default Comment;