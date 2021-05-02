const { strict } = require("assert")
var mongoose = require("mongoose")
var Schema = mongoose.Schema

var report = new Schema({
    issue: String,
    date: String,
    doctor: String,
    medicine: String,
    blood: String
})

const data = mongoose.model("data", report)

module.exports = data 