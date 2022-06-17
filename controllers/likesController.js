import likesRepository from "../repositories/likesRepository.js"

async function likePost(req, res) {
    const { usersId } = res.locals.users
    const { publicationsId } = req.body;

    try {
        await likesRepository.likePost(usersId, publicationsId);
        return res.status(200).send("Curtiu a publicação!");
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível curtir a publicação!")
    }
}

async function deslikePost(req, res) {
    const { user } = res.locals
    const { publicationsId } = req.body;

    const usersId = user.id;

    try {
        await likesRepository.deslikePost(usersId, publicationsId);
        return res.status(200).send("Descurtiu a publicação!");
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível descurtir a publicação!")
    }
}

async function countLikes(req, res) {
    const { publicationsId } = req.body;

    try {
        const likesInfo = await likesRepository.countLikes(publicationsId);
        return res.status(200).send(likesInfo);
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível enviar")
    }
}

async function getLikes(req, res) {
    try {
        const likes = await likesRepository.getLikes();
        return res.status(200).send(likes);
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível enviar os likes")
    }
}

export { likePost, deslikePost, countLikes, getLikes };
