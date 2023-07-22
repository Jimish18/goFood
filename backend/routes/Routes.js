const express = require('express');
const router = express.Router();

// Models
const User = require('../models/User');
const Order = require('../models/Orders')

// Database Connection
require('../db/conn');

// npm libraries 
const {body , validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = "mynameisjimishprajapatijayshreeram";


router.use(express.json());

// Fetching existing Food item and Category Details
require('../models/FoodItems');

// router.use('/',(req,res) =>
// {
//     res.send({"name": "Jimish"})
// })

// API for SignUp Details
router.post('/createuser', 
body('email','Invalid Email').isEmail(),
body('name','Too Short Name').isLength({min:5}),
body('password','Password is too weak').isLength({min:8})
,async (req,res) =>
{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors : errors.array()});     
    }

    // creating hashing for security purpose
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password,salt);

    try 
    {        
        const createUser = new User(req.body);
        const createdData = await createUser.save();

        return res.send({success : true})
    } 
    catch (error) 
    {
        console.log(error);    
    }
})

// API For Login Validation
router.post('/loginuser', 
body('email','Invalid Email').isEmail(),
body('password','Password is too weak').isLength({min:8})
,async (req,res) =>
{
    const errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors : errors.array()});     
    }

    let enteredEmail = req.body.email;
    let enteredPassword = req.body.password;

    try 
    {
        const userData = await User.findOne({email : enteredEmail});
        // console.log(userData);
        
        if(userData === null)
        {
            return res.status(400).send({errors : "Entered Invalid Credentials"});
        }

        const passwordComparison = await bcrypt.compare(enteredPassword,userData.password);

        if(!passwordComparison)
        {
            return res.status(400).send({errors : "Entered Invalid Credentials"});
        }

        const data = 
        {
            user : 
            {
                id : userData.id
            }
        }

        const authToken = jwt.sign(data,jwtSecret);
        
        return res.json({success : true , authToken : authToken});
    } 
    catch (error) 
    {
        res.send(error);    
    }
})

// API for exisiting Food Data Display
router.get('/foodData' , (req,res) =>
{
    try 
    {
        res.send([global.foodData , global.foodCategoryData]);    
    } 
    catch (error) 
    {
        console.error(error);    
    }
})


// API for order Details
router.post('/orderdata' , async (req,res) =>
{
    let data = req.body.order_data;
    await data.splice(0,0, {Order_date : req.body.order_date});

    let eId = await Order.findOne({'email' : req.body.email});

    if(eId === null)
    {
        try 
        {
            await Order.create({
                email : req.body.email,
                order_data : [data]
            }).then(()=>{
                res.json({success : true});
            }) 
        } 
        catch (error) 
        {
            console.error(error);
            res.send("Server Error" );    
        }
    }
    else
    {
        try 
        {
            await Order.findOneAndUpdate({email : req.body.email} ,
                {$push : {order_data : data}})
                .then(() =>
                {
                    res.json({success : true});
                })            
        } 
        catch (error) 
        {
            console.error(error);
            res.send("Server Error" );    
        }
    }


})


router.post('/myorderdata' , async (req,res) =>
{
    try 
    {
        let myData = await Order.findOne({'email' : req.body.email});
        res.json({orderData : myData});    
    }
    catch (error) 
    {
        console.error(error);
        res.send("Server Error" );    
    }
})

module.exports = router;