import {getUsers as repository} from "../repositories/searchRepository.js";

export async function searchUsers(req, res) {
    try {
        const users = await repository(req.params.user);
        res.status(200).json(users.rows);
    }catch(err){
        res.status(500).send(err);
    }
}