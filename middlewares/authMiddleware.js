import joi from "joi";

async function signInDataVerification (req, res, next) {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required()
    });

    const validation = schema.validate(req.body, { abortEarly: false });
    if (validation.error) {
        return res.status(422).send(validation.error.details);
    }

    res.sendStatus(200);
}

export { signInDataVerification };