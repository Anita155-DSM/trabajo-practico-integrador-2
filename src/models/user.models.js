import mongoose, { Schema, Types } from "mongoose";

const userSchema = new Schema({ //modelo/esquema usuario
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profile: {  //relacion 1:1 embebido requerido por el tp
        firstName: { 
            type: String 
        },
        lastName: { 
            type: String 
        },
        biography: { 
            type: String,
            allowNull: true,
        },
        avatarUrl: {
            allowNull: true,
            type: String
        },
        birthDate: { 
            type: Date,
            allowNull: true
        },
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
    versionKey: false
});

//populate reverso
userSchema.virtual('articles',{
    ref: 'article',
    localField: '_id',
    foreignField: 'author'
})

userSchema.set('toObject', { virtuals: true });
userSchema.set('toJSON', { virtuals: true });
    
const userModel = mongoose.model('user', userSchema);
export default userModel;