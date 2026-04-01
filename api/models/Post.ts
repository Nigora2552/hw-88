import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    author: {
        type: String || 'Anonymous',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type:String,
        required: function () {
            return !this.image;
        }
    },
    image:{
        type:String,
        required: function () {
            return !this.description;
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;