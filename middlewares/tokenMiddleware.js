import jwt from "jsonwebtoken";

async function tokenValidation (req, res, next) {
    const token = req.headers.cookie;
    if (!token) {
        return res.sendStatus(422);
    }
    try {
        const user = jwt.verify(filteredToken, process.env.JWT_SECRET);
        res.locals.user = user;
    } catch (error) {
        return res.sendStatus(400);
    }

    next();
}  

export default tokenValidation;