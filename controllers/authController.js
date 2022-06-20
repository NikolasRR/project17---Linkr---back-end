import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authRepository from "../repositories/authRepository.js"

async function signIn (req, res) {
    const { email, password } = req.body;

    try {
        const result = await authRepository.getUserByEmail(email);

        if (!result.rows[0]) {
            return res.status(401).send('User does not exist');
        }

        if (!bcrypt.compareSync(password, result.rows[0].password)) {
            return res.status(401).send('Wrong password');
        }

        delete result.rows[0].password;

        const config = { expiresIn: 60*60*12 };
        const token = jwt.sign(result.rows[0], process.env.JWT_SECRET, config);
        
        res.cookie('token', token, { httpOnly: true });
        return res.send(result.rows[0]).status(200);

    } catch (error) {
        console.log("entrou")
        console.log(error);
        return res.status(422).send("Não foi possível logar!")
    }
}

async function signUp(req, res) {
    const { email, password, userName, image } = req.body;
    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
        await authRepository.insertNewUser(email, encryptedPassword, userName, image);
        return res.status(201).send("Usuário criado com sucesso!");
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível registrar um novo usuário!")
    }
}

async function sessionValidation (req, res) {
    res.send(res.locals.user);
}

async function logout (req, res) {
    res.cookie('token', '', { httpOnly: true });
    res.sendStatus(200);
}

export { signIn, signUp, sessionValidation, logout };