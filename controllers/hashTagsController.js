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
    try{
        const result = await hashTagsRepository.getPostsByHashTag(req.params.hashTag);
        res.status(200).json(result.rows);
    }catch(err){
        res.sendStatus(500).send(err);
    }
}