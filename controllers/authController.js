import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { userRepository } from "../repositories/userRepository.js";

async function signIn (req, res) {
    const { email, password } = req.body;

    try {
        const result = await userRepository.getUserByEmail(email);
        if (!result.rows[0]) {
            return res.status(401).send('User does not exist');
        }

        if (!bcrypt.compareSync(password, result.rows[0].password)) {
            return res.status(401).send('Wrong password');
        }

        const config = { expiresIn: 60*60 };
        const token = jwt.sign(user, process.env.JWT_SECRET, config);
        return res.send(token).status(200);

    } catch (error) {
        
    }
}

export { signIn };