const express = require('express');
const userRoute = express.Router();
const jwt = require('jsonwebtoken');
//models import
const userModel = require('../models/user.model');
const postModel = require('../models/post.model');

//middleware import
const userAuthmiddleware = require('../middleware/userAuthmiddleware');
//utils import
const { hashPassword, comparePassword } = require('../utils/bcrypt');






//routes setup with controllers
userRoute.post('/signup', async (req, res) => {

    console.log('signup route hit');
    try {
        const { name, email, password } = req.body;


        //find user by email
        const user = await userModel.findOne({ email });
        if (user) {
            throw new Error('User already exists');
        }
        //create hash for passwod
        const hashedPassword = await hashPassword(password);
        const newUser = {
            name,
            email,
            password: hashedPassword
        }
        userModel.create(newUser);


        res.status(201).json({
            message: 'User created successfully',
            user: newUser.email
        });




    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})



userRoute.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        //find user exist or not
        const user = await userModel.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }
        //compare password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        //generate token

        const token = jwt.sign({ id: user._id }, process.env.USER_JWT, { expiresIn: '1h' });


        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 3600000
        }).status(200).json({
            message: 'User logged in successfully',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: 'user',
                canPost: user.canPost
            },
            token
        });


    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});




//user can create post 

userRoute.post('/createpost', userAuthmiddleware, async (req, res) => {
    try {
        if (!req.canPost) {
            throw new Error('ask admin to give you permission to post');
        }
        const { title, body } = req.body;
        const newPost = {
            title,
            body,
            user: req.userId
        }
        postModel.create(newPost);
        res.status(200).json({
            message: 'User post created ',
            post: newPost
        });
    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }

});


//user can see all post

userRoute.get('/allpost', async (req, res) => {
    try {
        const posts = await postModel.find().populate('user', 'name'); 
        // console.log(posts);
        res.status(200).json({
            message: 'All posts',
            posts
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});





module.exports = userRoute;