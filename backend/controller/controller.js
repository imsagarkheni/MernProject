const jwt = require('jsonwebtoken')
const usData = require("../models/schema");
const bcrypt = require('bcryptjs')

// ---------------------------------------------------------userRegister-------------------
exports.Register = async (req, res) => {
  // console.log(req.body);
  const { name, email, phone, work, password, cpassword } = req.body;
  try {
    const userExist = await usData.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Already Exist" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password are Not Matching" });
    } else {
      const user = new usData({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      });
     const saveuser=  await user.save();
      res.status(201).json({ message: "User Resister successfully",
    data:saveuser, });
    // console.log("hello",saveuser)
    }
  } catch (err) {
    console.log(err);
  }
};

// -------------------------------------------userLogin-----------------------------

exports.Login = async (req,res)=>{
  try {
    const email = req.body.email;
    const password = req.body.password

    const data = await usData.findOne({email:email});

    const isMatch = await bcrypt.compare(password,data.password)
    console.log(isMatch);
    if(!data){
      res.status(400).json({
        message:"Data Not Exist",
        status:400
      })
    }else{
      if(password === data.password || isMatch){
        // console.log("HLLLOOO",data);
        res.status(200).json({
          message:"Login Successfully",
          status:200,
          id:data._id
        })
      }else{
        res.status(400).json({
          message:"Password Incorrect",
          status:400
        })
      }
    }
  } catch (error) {
    res.status(400).json({
      message:"Something Went to Wrong!",
      status:400
    })
  }
}
// ----------------------------------------Viewdetails------------------------------------------------
exports.detailAll = async (req, res) => {
  try {
    const data = await usData.find();
    res.send(data);
    res.status(200).json({
      message: "View By Id DetailsofUser",
      status: 200,
      data: data,
    });
  } catch (e) {
    // res.send(e);
    // res.status(400).json({
    //   message: "Something Went to Wrong",
    //   status: 400,
    // });
  }
};

// --------------------------------------View By Name--------------------------------------------------
exports.userName = async (req, res) => {
  try {
    const name = req.params.name;
    console.log("name:", name);
    const data = await usData.find({ name: name });
    console.log("data::", data);
    res.status(200).json({
      message: "View By name of UserData",
      status: 200,
      info: {
        id: data[0]._id,
        name: data[0].name,
        email: data[0].email,
        phone: data[0].phone,
        work: data[0].work,
        password: data[0].password,
        cpassword: data[0].cpassword,
        tokens: data[0].tokens,
       
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Something Went Wrong",
      status: 400,
    });
  }
};

//To update data-----------------------------------------------------------------
exports.userUpdate = async (req, res) => {
  try {

    
    const id = req.params.id;

    const data = await usData
      .findByIdAndUpdate(
        {
          _id: req.params.id,
        },
        {
          $set: {
            name: req.body.name,
            email: req.body.email, 
            phone: req.body.phone,
            work: req.body.work,
            password: req.body.password,
            cpassword: req.body.cpassword,
          },
        }
      )
      .then(() => {
        res.status(200).json({
          message: "Update Data Successfully",
          status: 200,
        });
      })
      .catch((err) => {
        res.status(400).json({
          message: "Update Data Not Successfully",
          status: 400,
        });
      });
  } catch (error) {
    res.status(400).json({
      message: "Somthing Went Wrong",
      status: 400,
    });
  }
};
// --------------------------------------byid-----------------------------

exports.userID = async (req, res) => {
  try {
    var id = req.params.id;

    const data = await usData.find({ _id: id });
    // console.log(data);
    res.status(200).json({
      message: "View By Id DetailsofUser",
      status: 200,
      info: {
        id: data[0]._id,
        name: data[0].name,
        email: data[0].email,
        phone: data[0].phone,
        work: data[0].work,
        
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Something Went to Wrong",
      status: 400,
    });
  }
};

// ------------------------------DeleteData---------------------------

exports.detailsDelete = async (req, res) => {
  try {
    var id = req.params.id;
    const data = await usData.find({ id: id });
    const del = usData.findByIdAndDelete(id);
    del.exec(function (err, data) {
      if (err) throw err;

      res.status(200).json({
        message: "Delete Details of User",
        status: 200,
        data: data,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Data Not Delete",
      status: 500,
    });
  }
};




