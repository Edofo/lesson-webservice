import mongoose from "mongoose";

// Create a schema for Courses with mongoose
const CoursesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
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
        }
    ]
});

export default CoursesSchema;
