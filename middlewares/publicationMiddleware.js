import joi from "joi"

export async function publicationValidator(req,res,next){
    const publicationSchema = joi.object({
    url: joi.string().uri().required(),
    text: joi.string()
    })

    const validation = publicationSchema.validate(req.body, { abortEarly: false})
    if(validation.error){
        return res.status(422).send(validation.error.details);
    }

    next();

    res.locals.url = url
}
