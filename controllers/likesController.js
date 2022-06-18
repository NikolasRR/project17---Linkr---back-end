import likesRepository from "../repositories/likesRepository.js"

async function likePost(req, res) {
    const { user } = res.locals
    const { publicationId } = req.body;

    const usersId = user.id

    try {
        await likesRepository.likePost(usersId, publicationId);
        return res.status(200).send("Curtiu a publicação!");
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível curtir a publicação!")
    }
}

async function deslikePost(req, res) {
    const { user } = res.locals
    const { id } = req.params;

    console.log("post", id)

    const usersId = user.id;

    console.log("user", usersId)

    try {
        await likesRepository.deslikePost(usersId, id);
        return res.status(200).send("Descurtiu a publicação!");
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível descurtir a publicação!")
    }
}

async function countLikes(req, res) {
    const { id } = req.params;

    try {
        const likesInfo = await likesRepository.countLikes(id);
        console.log("iha", likesInfo.rows)
        if (likesInfo.rows.length == 0){
            return res.status(200).send(`${likesInfo.rows.length}`)
        } else {
            console.log(likesInfo.rows[0].count)
            return res.status(200).send(likesInfo.rows[0].count);
        }
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível enviar")
    }
}

async function getLikes(req, res) {
    try {
        const likes = await likesRepository.getLikes();
        return res.status(200).send(likes.rows);
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível enviar os likes")
    }
}

async function getLikesById(req, res) {
    const { id } = req.params;

    try {
        const allInfo = await likesRepository.getLikesById(id);
        return res.status(200).send(allInfo.rows);
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi possível enviar os likes")
    }
}

export { likePost, deslikePost, countLikes, getLikes, getLikesById };
