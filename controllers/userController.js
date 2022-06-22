import userRepository from "../repositories/userRepository.js"

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