import jwt from "jsonwebtoken";

async function tokenValidation (req, res, next) {
    const token = req.cookies.token
    if (!token) {        
        return res.status(422).send('Missing token');
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        res.locals.user = user;
        
        next();
    } catch (error) {
        console.log(error)
        return res.sendStatus(400);        
    }

}  

export default tokenValidation;