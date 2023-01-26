import mongoose from "mongoose";

// Create a schema for Classes with mongoose
const ClassesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    Students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Students",
        },
    ],
})


export default ClassesSchema;