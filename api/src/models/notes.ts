import mongoose from "mongoose";

// Create a schema for Notes with mongoose
const NotesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    note: {
        type: Number,
        required: true,
    },
    Students: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
    },
    Courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
    },
});

export default NotesSchema;
