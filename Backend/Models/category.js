const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please provide a name for category"],
        unique: true,
        minlength: [3, "Please provide a name for category at least 3 characters"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description for category"],
        minlength: [3, "Please provide a description for category at least 3 characters"]
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
   
}, { timestamps: true })


const Category = mongoose.model("Category", CategorySchema)

module.exports = Category;