import hashTagsRepository from "../repositories/hashTagsRepository.js";

export async function getTrending(req, res) {
    try{
        const result = await hashTagsRepository.getTrending();
        res.status(200).json(result.rows);
    }catch(err){
        res.status(500).send(err);
    }
    
}

export async function getPostsByHashTag(req, res) {
    const {hashtag} = req.params;
    console.log(hashtag);
    try{
        const {rows} = await hashTagsRepository.getPublicationsByHashTag(hashtag);
        console.log(rows);
        if(rows.length===0){
            return res.status(404).send(rows)
        }

        res.status(200).send(rows)

    }catch(err){
        console.log("erro: ", err);
        res.sendStatus(500).send(err);
    }
}