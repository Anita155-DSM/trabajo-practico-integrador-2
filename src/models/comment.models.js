import mongoose, { Schema, Types } from "mongoose";

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
    }
}, {
    createdAt: { 
        type: Date
    },
    updatedAt: {
        type: Date
    },
    versionKey: false
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
