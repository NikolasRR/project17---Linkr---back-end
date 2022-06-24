import commentsRepository from "../repositories/commentsRepository.js"

async function postComment(req, res) {
    const { user } = res.locals;
    const { publicationId, content } = req.body;

    const userId = user.id

    if (!content) {
        return res.status(404).send("Corpo do comentário vazio!")
    }

    try {
        await commentsRepository.postComment(userId, publicationId, content)
        return res.status(201).send("Comentário postado!")

    } catch (e) {
        console.log(e);
        return res.status(422).send("Não foi publicar o comentário!")
    }
}

async function getComments(req, res) {
    const { id } = req.params;

    try {
        const comments = await commentsRepository.getComments(id)
        return res.status(200).send(comments.rows)

    } catch (e) {
        console.log(e);
        return res.status(422).send("Não possível carregar os comentário")
    }
}

async function countComments(req, res) {
    const { id } = req.params;

    try {

        const commentCount = await commentsRepository.countComments(id);

        if (commentCount.rows.length == 0) {
            return res.status(200).send(`${commentCount.rows.length}`);
        } else {
            return res.status(200).send(commentCount.rows[0].count);
        }

    } catch (e) {
        console.log(e);
        return res.status(422).send("Não possível enviar a contagem!")
    }
}

async function isFollowing(req, res) {
    const { id } = req.params;

    try {
        const followers = await commentsRepository.isFollowing(id);
        return res.status(200).send(followers.rows[0]);
    
    } catch (e) {
        console.log(e);
        return res.status(422).send("Não possível enviar os dados!")
    }
}

export { postComment, getComments, countComments, isFollowing };