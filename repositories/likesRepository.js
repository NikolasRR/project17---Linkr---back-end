import db from "../config/db.js";

async function likePost(usersId, publicationsId){
    return db.query(`
        INSERT INTO likes ("userId", "publicationsId")
        VALUES ($1, $2)`,
        [usersId, publicationsId]);
}

async function deslikePost(usersId, publicationsId) {
    return db.query(`
        DELETE from likes
        WHERE "usersId" = $1 AND "publicationsId" = $2`,
        [usersId, publicationsId]);
}

async function countLikes(publicationsId) {
    return db.query(`
        SELECT COUNT(likes."publicationsId"), users.name
        FROM likes
        JOIN users ON users.id = likes."usersId"
        WHERE likes."publicationsId" = $1`,
        [publicationsId])
}

const likesRepository = 
{
    likePost,
    deslikePost,
    countLikes
}

export default likesRepository;
