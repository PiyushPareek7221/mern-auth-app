const router = require('express').Router();
const User  =require("../models/User")
const {registerValidation, loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req,res)=>{

    const {error} = registerValidation(req.body)
    if(error) return res.status(400).json({message:error.details[0].message})

    const emailExists = await User.findOne({email:req.body.email})
    if(emailExists) return res.status(400).json({error:"Email already exists"})

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    
    try {
        const saveduser = await user.save();
        res.send({user:user._id})
    } catch (error) {
        res.status(400).send(error)
    }
}) 



router.post('/login',  async (req,res)=>{
   
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).json({message:error.details[0].message})

    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).json({error:"Invalid email"})

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({error:"Invalid Password"})

    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
}) 

module.exports = router;