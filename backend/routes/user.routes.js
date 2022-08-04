const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const authenticate = require("../middleware/authenticate")

const { Register,
    Login,
    detailAll,
    userName,
    userUpdate,
    userID,
    detailsDelete } = require("../controller/controller");

router.post("/register", Register);
router.post("/signin", Login);



router.get("/detailAll", detailAll);

router.get("/userName/:name", userName);

router.get("/userID/:id",userID)

router.put("/userUpdate/:id",userUpdate);

router.delete("/detailsDelete/:id", detailsDelete)



module.exports = router;