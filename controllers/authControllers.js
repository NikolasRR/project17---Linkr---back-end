import bcrypt from 'bcrypt';

import authRepository from "../repositories/authRepository.js"

async function registerUser(req, res) {
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

export default registerUser;