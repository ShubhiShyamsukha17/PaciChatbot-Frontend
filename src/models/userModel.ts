import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
    name: string;
    email: string;
    profilePic: string;
    phoneNo: string;
    admin: boolean;
    regNo: string;
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
    },
    profilePic: {
        type: String,
        default: 'default.jpg',
    },
    phoneNo: Number,
    regNo: String,
    admin: {
        type: Boolean,
        default: false,
    },
});

const User =
    mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);

export default User;
