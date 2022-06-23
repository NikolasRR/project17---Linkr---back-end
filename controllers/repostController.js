import repostRepository from "../repositories/repostRepository.js"



export async function getRepublications(req, res) {
    const {id} = req.params;
    try {
        const { rows: posts } = await repostRepository.getPublications(id);
        const { rows: reposts} = await repostRepository.getReposts(id);
        for(let i in reposts){
            reposts[i]={...reposts[i], "isRepost":true}
        }
        const allPosts = posts.concat(reposts);
        allPosts.sort((a, b)=> {
            return b.createdAt - a.createdAt;
        });
        res.status(200).send(allPosts)

    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}