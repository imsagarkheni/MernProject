const express = require("express");
const app = express();
const PORT = process.env.PORT || 1122;
require('dotenv').config()
const jwt = require('jsonwebtoken')
require("../backend/db/connection");
const cors = require('cors');

const userData = require("./models/schema");

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())
// const userRoute = require("./routes/user.routes");
app.use(require('./routes/user.routes'))

const cretetoken = async()=>{
    const token = await jwt.sign({_id:"62e968616f4be31131a24a27"},"aaabbbcccdddeeefffggghhhiiijjjkkk")
    console.log(token);

    const userver = await jwt.verify(token,"aaabbbcccdddeeefffggghhhiiijjjkkk" );
    console.log(userver);
}
// cretetoken();


app.listen(PORT, (req, res) => {
    console.log(`Server Conected at ${PORT}`);
})