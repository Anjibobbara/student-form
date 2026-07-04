const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    studentName: String,
    regNo: String,
    fatherName: String,
    motherName: String,
    dob: String,
    mobile: String,
    altMobile: String,
    email: String,
    password: String,
    gender: String,
    course: [String],
    address: String,
    language: String
});

module.exports = mongoose.model("Student", StudentSchema);