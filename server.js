const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const Student = require("./models/Student");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.post("/register", async (req, res) => {

    try {

        const student = new Student(req.body);

        await student.save();

        res.json({
            success: true,
            message: "Student Registered Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});
app.get("/students", async (req, res) => {

    try {

        const students = await Student.find();

        res.json(students);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

app.delete("/students/:id", async (req, res) => {

    try {

        await Student.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Student Deleted Successfully"
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});
app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});