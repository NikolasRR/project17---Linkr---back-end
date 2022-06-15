import publicationSchema from "../schemas/publicationSchema.js";

export  async function publicationValidator(req,res,next){

    const validation = publicationSchema.validate(req.body, { abortEarly: false})
    if(validation.error){
        return res.status(422).send(validation.error.details);
    } 

    res.locals.publicationData = req.body

    next();
}
