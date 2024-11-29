const express = require('express');
const dotenv = require('dotenv');
const connectToDataBase = require('./db/db');
const cookieParser = require('cookie-parser');
const errorHandeller = require('./middleware/errorhandeler');
const postModel = require('./models/post.model');
const cors = require('cors')

const app = express();

// Configure dotenv
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandeller);


app.use(cors({
    origin: 'https://vrvtaskfrontend.vercel.app',
    credentials: true,
}));


// Routes
const userRoute = require('./route/user.route');
const adminRoute = require('./route/admin.route');
app.use('/api/v1/user', userRoute);
app.use('/api/v1/admin', adminRoute);

// backend health route
app.get('/', (req, res) => {
    res.send('i am fine');
});

app.post('/logout', (req, res) => {
    res.clearCookie('token').send('Logged out');
});

app.get('/posts/:postid', async (req, res) => {
    try {
        const post = await postModel.findById(req.params.postid).populate('user', 'name');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ post });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});
// Start the server
async function startServer() {
    try {
        await connectToDataBase(process.env.MONGOURI);
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });
    } catch (err) {
        console.error('Error starting the server:', err);
    }
}

startServer();
