import jwt from "jsonwebtoken";

async function tokenValidation (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.sendStatus(422);
    }
    const filteredToken = token.replace("Bearer", "").trim();
    try {
        const user = jwt.verify(filteredToken, process.env.JWT_SECRET);
        res.locals.user = user;
    } catch (error) {
        return res.sendStatus(400);
    }

    next();
}  

export default tokenValidation;