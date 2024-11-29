const bcryptjs = require('bcryptjs');


async function hashPassword(password) {
    const hashedPassword = await bcryptjs.hash(password, parseInt(process.env.SALT));
    return hashedPassword;
}



async function comparePassword(password, hashedPassword) {
    const isValid = await bcryptjs.compare(password, hashedPassword);
    return isValid;
}


module.exports = { hashPassword, comparePassword };