import hashTagsRepository from "../repositories/hashTagsRepository.js";

export async function getTrending(req, res) {
    try {
        const result = await hashTagsRepository.getTrending();
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).send(err);
    }

}

export async function getPostsByHashTag(req, res) {
    const { hashtag } = req.params;

    try {
        const { rows } = await hashTagsRepository.getPublicationsByHashTag(req.params.hashtag);
        res.status(200).send(rows);

    } catch (err) {
        console.log("erro: ", err);
        res.sendStatus(500).send(err);
    }
}

export async function getPublicationsAndRepublicationsByHasgTag (req,res){

    const { hashtag } = req.params;
    
    try {
        const { rows: posts } = await hashTagsRepository.getHashtagPublications(hashtag);
        const { rows: reposts} = await hashTagsRepository.getHashtagReposts(hashtag);
        
        for(let i in reposts){
            reposts[i]={...reposts[i], "isRepost":true}
        }

        const allPosts = posts.concat(reposts);
        allPosts.sort((a, b)=> {
            return b.createdAt - a.createdAt;
        });      
       
        res.status(200).json({ "data": allPosts, "message":"OK"})

    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
} 