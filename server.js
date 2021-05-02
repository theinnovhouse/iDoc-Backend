const express = require('express')
const mongoose = require('mongoose')
const data = require('./docSchema')
var app = express() 
var Data = require('./docSchema')

mongoose.connect("mongodb://localhost/newDDB")

mongoose.connection.once("open", () => {

    console.log("Connected to database!")

}).on("error", (error) => {

    console.log("failed to connect! " + error)

})

// CEATE NOTE 
// POST request

app.post("/create", (req, res) => {
    
    var note = new Data({
     issue: req.get("issue"),
     date: req.get("date"),
     doctor: req.get("doctor"),
     medicine: req.get("medicine"),
     blood: req.get("blood"),
    })

    note.save().then(() => {
        if(note.isNew == false){
            console.log("Saved Data!")
            res.send("Saved data!")
        }else{
            console.log("Failed to save data!")
        }
    })
})

// FETCH NOTE
// GET request

app.get('/fetch', (req, res) => {

    Data.find({}).then((DBitems) => {
       res.send(DBitems)
    })
})

// DELETE NOTE
// POST request

app.post("/delete", (req, res) => {

    data.findByIdAndRemove({

       _id: req.get("id") 
    }, (err) => {
        console.log("Failed " + err)
    })

    res.send("Deleted!")

})

// UPDATE NOTE 
// POST request

app.post('/update', (req,res) => {
    Data.findOneAndUpdate({
        _id: req.get("id")
    },{
        issue: req.get("note"),
        date: req.get("date"),
        blood: req.get("blood"),
       // weight: req.get("weight"),
        // height: req.get("height"),
        // heartDiseases: req.get("heartDiseases"),
        doctor: req.get("doctor"),
        medicine: req.get("medicine"),
        //hospital: req.get("hospital"),

    }, (err) => {
         console.log("Failed to update " +err)
    })
    res.send("Updated!")
})


//http://192.168.0.7:8081/create
var server = app.listen(8082, "192.168.0.7", () => {
    console.log("Server is Running!")
})





