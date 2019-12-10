const jwt = require('jsonwebtoken')
const User = require('../models/user')
const keys = require("../config/keys")

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        const decoded = jwt.verify(token, keys.secretJwt)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
          
        if (!user) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
       

    }
}

module.exports = auth
