import mongoose, { Schema, Types } from "mongoose";

const articleSchema = new Schema({ //modelo/esquema articulo
    title: {
        type: String,
        required: true //esto preguntar al profe
    },
    content: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        allowNull: true
    },
    status: {
        type: String,
        enum: ['published', 'archived'],
        default: 'published'
    },
    tags: [{
        type: Types.ObjectId,
        ref: 'tag'
    }],
    author: {
        type: Types.ObjectId,
        ref: 'user',
        required: true
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

//populate reverso
articleSchema.virtual('comments', {
    ref: 'comment',
    localField: '_id',
    foreignField: 'article'
});
articleSchema.set('toObject', { virtuals: true });
articleSchema.set('toJSON', { virtuals: true });

const articleModel = mongoose.model('article', articleSchema);
export default articleModel;