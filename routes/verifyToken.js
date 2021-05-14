const jwt = require('jsonwebtoken')
  
module.exports = function (req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access denied')

    try {
        //id of the user having the token in verified
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        //can be accesed
        req.user = verified
    } catch (error) {
        res.status(400).send('Invalid Token')
    }
    next();
}