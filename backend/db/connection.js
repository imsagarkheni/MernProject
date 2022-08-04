const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mernstack")
.then(()=>{
    console.log("MongoDB connected");
})
.catch(()=>{
    console.log("connection failed of MongoDB");
});