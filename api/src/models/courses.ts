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
});

export default CoursesSchema;
