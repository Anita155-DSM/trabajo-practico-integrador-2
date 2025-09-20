import { Schema, Types } from "mongoose";

const commentSchema = new Schema({
    content: { 
        type: String, 
        required: true 
    },
    author: { 
        type: Types.ObjectId, 
        ref: "user"
    },
    article: {
        type: Types.ObjectId,
        ref: "article"
    },
    createdAt: { 
        type: Date, 
    },
    updateAt: {
        type: Date
    }
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
