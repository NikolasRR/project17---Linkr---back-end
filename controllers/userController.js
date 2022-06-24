import userRepository from "../repositories/userRepository.js"
import repostRepository from "./../repositories/repostRepository.js"

export async function getUserPublications(req, res) {
    const { lastId } = req.query;

    try {
        const { id } = req.params;
        const { rows } = await userRepository.getUserPublications(id, parseInt(lastId));
        res.status(200).send(rows);

    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export async function getFollowing(req, res) {
    try {
        const followerId = parseInt(req.params.id)
        const userId = res.locals.user.id
        const { rows } = await userRepository.getUserFollower(userId, followerId);
        res.status(200).send(rows)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export async function postFollower(req, res) {
    try {
        const followerId = parseInt(req.params.id)
        const { user } = res.locals
        const userId = user.id

        await userRepository.postUserFollower(userId, followerId);
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export async function deleteFollower(req, res) {
    try {
        const followerId = parseInt(req.params.id)
        const { user } = res.locals
        const userId = user.id

        await userRepository.deleteFollower(userId, followerId);
        res.sendStatus(200)
    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export async function getUserPublicationsAndRepublications(req, res) {
    const { id } = req.params;
    const start = parseInt(req.query.start);

    try {
        const { rows: posts } = await repostRepository.getUserPublications(id);
        const { rows: reposts } = await repostRepository.getUserReposts(id);

        for (let i in reposts) {
            reposts[i] = { ...reposts[i], "isRepost": true }
        }

        const allPosts = posts.concat(reposts);
        allPosts.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        const filteredPosts = allPosts.splice(start, 10);
        
        res.status(200).send(filteredPosts);

    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}   
