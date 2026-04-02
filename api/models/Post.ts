import mongoose from "mongoose";


const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: function () {
            return !this.image;
        }
    },
    image: {
        type: String,
        required: function () {
            return !this.description;
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

PostSchema.pre('findOneAndDelete', async function () {
   const docToDelete = await this.model.findOne(this.getQuery());
   if(docToDelete){
       await  mongoose.model('Comment').deleteMany({post: docToDelete._id})
   }
});

const Post = mongoose.model('Post', PostSchema);
export default Post;