import postsRepository from "../repositories/postRepository.js";
import publicationSchema from "../schemas/publicationSchema.js";

export  async function publicationValidator(req,res,next){

    const validation = publicationSchema.validate(req.body, { abortEarly: false})
    if(validation.error){
        return res.status(422).send(validation.error.details);
    } 

    res.locals.text = req.body.text;
    res.locals.url = req.body.url;
    
    next();
}

export async function postDeletionValidator (req, res, next) {
    const { postId, linkId } = req.query;
    const user = res.locals.user;

    if (!postId || !linkId) {
        return res.sendStatus(422);
    }

    try {
        const {rows} = await postsRepository.getPublication(postId, user.id);
        if (!rows[0]) {
            return res.sendStatus(401);
        }
        next();

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
