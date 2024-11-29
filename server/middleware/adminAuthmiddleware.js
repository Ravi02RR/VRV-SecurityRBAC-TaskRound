const jwt = require('jsonwebtoken');
const adminModel = require('../models/admin.model')

async function adminAuthmiddleware(req, res, next) {

    try {
        const token = req.cookies['token'];

        if (!token) {
            throw new Error('User not authenticated');
        }
        const decoded = jwt.verify(token, process.env.ADMIN_JWT);
        if (!decoded) {
            throw new Error('User not authenticated');
        }
        const user = await adminModel.findById(decoded.id);
        if (!user) {
            throw new Error('User not authenticated');
        }
        req.adminId = decoded.id;
        next();

    }
    catch (err) {
        res.status(401).json({ message: err.message });
    }

}


module.exports = adminAuthmiddleware;