const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function userAuthmiddleware(req, res, next) {


    try {
        const token = req.cookies['token'];
        // console.log(token);
        if (!token) {
            throw new Error('User not authenticated', token);
        }
        const decoded = jwt.verify(token, process.env.USER_JWT);
        if (!decoded) {
            throw new Error('User not authenticated', decoded);
        }
        const user = await userModel.findById(decoded.id);
        if (!user) {
            throw new Error('User not authenticated' + decoded.id);
        }
        req.userId = decoded.id;
        req.canPost = user.canPost;
        next();

    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }

}


module.exports = userAuthmiddleware;