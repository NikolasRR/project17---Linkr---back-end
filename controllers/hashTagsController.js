import hashTagsRepository from "../repositories/hashTagsRepository";

export async function getTrending(res, req) {
    try{
        const result = await hashTagsRepository.getTrending();
        res.status(200).json(result);
    }catch(err){
        res.status(500).send(err);
    }
}

export async function getPostsByHashTag(res, req) {
    try{
        const result = await hashTagsRepository.getPostsByHashTag(req.params.hashTag);
        res.status(200).json(result);
    }catch(err){
        res.status(500).send(err);
    }
}