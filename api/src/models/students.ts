import mongoose from "mongoose";

// Create a schema for Students with mongoose
const StudentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    Classes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classes",
    },
    Notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notes",
        },
    ],
})

export default StudentsSchema;