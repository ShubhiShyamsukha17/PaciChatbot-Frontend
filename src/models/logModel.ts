import mongoose from 'mongoose';

export interface LogDocument extends mongoose.Document {
    request: string;
    response: string;
    score: number;
    userID: string;
    ip: string;
    createdAt: Date;
}

const logSchema = new mongoose.Schema({
    request: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    userID: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
});

const Log =
    mongoose.models.Log || mongoose.model<LogDocument>('Log', logSchema);

export default Log;
