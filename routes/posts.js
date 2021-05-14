const router = require('express').Router()
const verify = require('./verifyToken')

const User  =require("../models/User")

router.get('/', verify, async (req,res)=>{
    // res.json({posts:{title:"My first post", description:"Random data should not be accesed without logged in"}})/
    
    const user =  await User.findOne({_id:req.user._id})
    res.send(user)
})

module.exports = router