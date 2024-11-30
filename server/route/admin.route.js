const express = require('express');
const adminRoute = express.Router();
const jwt = require('jsonwebtoken');
const validator = require('validator');

const adminModel = require('../models/admin.model');
const userModel = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const adminAuthmiddleware = require('../middleware/adminAuthmiddleware');
const postModel = require('../models/post.model');

adminRoute.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate inputs
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if admin already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Admin already exists' });
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        const newAdmin = await adminModel.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: 'Admin created successfully',
            admin: {
                id: newAdmin._id,
                name: newAdmin.name,
                email: newAdmin.email
            }
        });
    } catch (err) {
        console.error('Admin signup error:', err);
        res.status(500).json({ message: 'Server error during admin signup' });
    }
});

adminRoute.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate inputs
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find admin
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Compare password
        const isMatch = await comparePassword(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = jwt.sign(
            { id: admin._id },
            process.env.ADMIN_JWT,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 3600000,
            path: '/',
        }).status(200).json({
            message: 'Admin logged in successfully',
            admin: {
                id: admin._id,
                email: admin.email,
                name: admin.name,
                role: 'admin'
            },
            token
        });

    } catch (err) {
        console.error('Admin signin error:', err);
        res.status(500).json({ message: 'Server error during admin signin' });
    }
});

adminRoute.put('/updateUserState', adminAuthmiddleware, async (req, res) => {
    try {
        const userId = req.query.userid;
        const { canPost } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.canPost = canPost;
        await user.save();

        res.json({
            message: 'User state updated successfully',
            user: {
                email: user.email,
                canPost: user.canPost
            }
        });
    } catch (err) {
        console.error('Update user state error:', err);
        res.status(500).json({ message: 'Server error updating user state' });
    }
});
adminRoute.put('/blockuser', adminAuthmiddleware, async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user
            = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isBlocked = !user.isBlocked;
        user.isBlocked = isBlocked;
        await user.save();
        res.json({
            message: `User ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
            user: {
                email: user.email,
                isBlocked: user.isBlocked
            }
        });
    } catch (err) {
        console.error('Block user error:', err);
        res.status(500).json({ message: 'Server error blocking user' });
    }
});
// adminRoute.post('/createpost', adminAuthmiddleware, async (req, res) => {
//     try {
//         const { title, body } = req.body;
//         const newPost = {
//             title,
//             body,
//             user: req.userId
//         }
//         postModel.create(newPost);
//         res.status(200).json({
//             message: 'User post created ',
//             post: newPost
//         });
//     }
//     catch (err) {
//         res.status(401).json({ message: err.message });
//     }

// });

adminRoute.get('/getallusers', adminAuthmiddleware, async (req, res) => {
    try {
        const users = await userModel.find().select('-password');
        res.json({
            message: 'Users retrieved successfully',
            users
        });
    } catch (err) {
        console.error('Get all users error:', err);
        res.status(500).json({ message: 'Server error retrieving users' });
    }
});

adminRoute.delete('/deleteuser', adminAuthmiddleware, async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const user = await userModel.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            user: {
                id: user._id,
                email: user.email
            }
        });
    } catch (err) {
        console.error('Delete user error:', err);
        res.status(500).json({ message: 'Server error deleting user' });
    }
});

adminRoute.delete('/deletepost', adminAuthmiddleware, async (req, res) => {
    try {
        const postId = req.query.postId;

        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required' });
        }

        const post = await postModel.findByIdAndDelete(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json({
            message: 'Post deleted successfully',
            post: {
                id: post._id,
                title: post.title
            }
        });

    } catch (err) {
        console.error('Delete post error:', err);
        res.status(500).json({ message: 'Server error deleting post' });

    }

});

adminRoute.post('/createuser', adminAuthmiddleware, async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }


        //cheack for user 
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        if (!validator.isEmail(email)) {
            throw new Error('Invalid email format');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        //hash password 
        const hashedPassword = await hashPassword(password);

        const newUser = await userModel.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (err) {
        res.status(401).json({ message: err.message });
    }

})

//get stats of users like  total users, total posts

adminRoute.get('/getstats', adminAuthmiddleware, async (req, res) => {
    try {
        const totalUsers = await userModel.countDocuments();
        const totalPosts = await postModel.countDocuments();

        res.json({
            message: 'Stats retrieved successfully',
            stats: {
                totalUsers,
                totalPosts
            }
        });
    } catch (err) {
        console.error('Get stats error:', err);
        res.status(500).json({ message: 'Server error retrieving stats' });
    }
});




module.exports = adminRoute;