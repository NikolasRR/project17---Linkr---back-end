import db from "../config/db.js";

async function likePost(usersId, publicationId){
    return db.query(`
        INSERT INTO likes ("userId", "publicationId")
        VALUES ($1, $2)`,
        [usersId, publicationId]);
}

async function deslikePost(usersId, id) {
    return db.query(`
        DELETE from likes
        WHERE "userId" = $1 AND "publicationId" = $2`,
        [usersId, id]);
}

async function countLikes(id) {
    return db.query(`
        SELECT COUNT(likes."publicationId")
        FROM likes
        WHERE likes."publicationId" = $1`,
        [id]);
}

async function getLikes() {
    return db.query(`
        SELECT likes.id, likes."publicationId", likes."userId", users."userName"
        FROM likes
        JOIN users ON users.id = likes."userId"
    `);
}

async function getLikesById(id) {
    return db.query(`
        SELECT likes.id, likes."publicationId", likes."userId", users."userName"
        FROM likes
        JOIN users ON users.id = likes."userId"
        WHERE likes."publicationId" = $1`,
        [id]);
}

const likesRepository = 
{
    likePost,
    deslikePost,
    countLikes,
    getLikes, 
    getLikesById
}

export default likesRepository;
