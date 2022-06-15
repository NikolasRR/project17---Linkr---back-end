import joi from "joi";

import signUpSchema from "../schemas/authSchema.js";
import authRepository from "../repositories/authRepository.js"

async function signInDataVerification (req, res, next) {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(422).send(validation.error.details);
    }

    next();
}

async function validateSignUp(req, res, next) {
    const { email, password, userName, image } = req.body;

    const { error } = signUpSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).send(error.details.map((error) => error.message));
    }

    try {
        const emailExist = await authRepository.getUserByEmail(email);
        const userExist = await authRepository.getUserByName(userName);

        if (emailExist.rows[0]) {
            return res.status(409).send("E-mail já cadastrado!");
        }

        if (userExist.rows[0]) {
            return res.status(409).send("UserName já em uso!");
        }

        next();
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível cadastrar!");
    }
}

export { signInDataVerification, validateSignUp };