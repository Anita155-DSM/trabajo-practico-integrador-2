import mongoose, { Schema, Types } from "mongoose"

const tagSchema = new Schema({ //modelo/esquema tag
    name: { 
        type: String,
        unique: true
    },
    description: {
        type: String,
        allowNull: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

const tagModel = mongoose.model('tag', tagSchema);
export default tagModel;
