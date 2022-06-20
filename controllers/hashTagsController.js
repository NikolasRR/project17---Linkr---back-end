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