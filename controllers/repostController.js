import repostRepository from "../repositories/repostRepository.js";
import postsRepository from "../repositories/postRepository.js";

export async function getRepublications(req, res) {
    const userId = res.locals.user.id;
    const start = parseInt(req.query.start);
    console.log("oi");

    try {
        // const { rows: posts } = await repostRepository.getPublications(id);
        // const { rows: reposts} = await repostRepository.getReposts(id);
        console.log("oi2");
        const { rows: followers } = await postsRepository.getUserFollowers(userId)
        if (followers.length === 0) {
            console.log('oi4');
            return res.status(204).send([]);
        }

        const { rows: posts } = await repostRepository.getPublications();
        console.log("oi3");
        const { rows: reposts } = await repostRepository.getReposts();

        for (let i in reposts) {
            reposts[i] = { ...reposts[i], "isRepost": true }
        }
        const allPosts = posts.concat(reposts);
        allPosts.sort((a, b) => {
            return b.timestamp - a.timestamp;
        });

        let followersPosts = []

        for (let post of allPosts) {
            for (let follower of followers) {
                if (post.userId === follower.followerId || post.repostId === follower.followerId) {
                    followersPosts.push(post)
                }
            }
        }

        const filteredPosts = followersPosts.splice(start, 10);
        console.log(followersPosts);
        res.status(200).send(filteredPosts);

    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export async function postResposts(req, res) {
    const { userId, postId } = req.body
    try {
        await repostRepository.setRepost(userId, postId)
        res.sendStatus(201);
    } catch (error) {
        res.sed(error).status(500);
    }
}
