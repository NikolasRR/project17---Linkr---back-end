import db from "../config/db.js";

async function postComment(userId, publicationId, content) {
    return db.query(`
        INSERT INTO comments("userId", "publicationId", content)
        VALUES($1, $2, $3)`,
        [userId, publicationId, content]);
}

async function getComments(id) {
    return db.query(`
        SELECT users."userName", users.image, comments.content, publications."idUser", comments."userId" as "commentUserId"
        FROM comments
        JOIN users ON users.id = comments."userId"
        JOIN publications ON publications.id = comments."publicationId"
        WHERE comments."publicationId" = $1`,
        [id]);
}

async function countComments(id) {
    return db.query(`
        SELECT COUNT(comments."publicationId")
        FROM comments
        WHERE comments."publicationId" = $1`,
        [id]);
}

async function isFollowing(id) {
    return db.query(`
        SELECT followers."followerId"
        FROM followers
        WHERE followers."userId" = $1`,
        [id]);
}

const likesRepository = {
    postComment,
    getComments,
    countComments,
    isFollowing
}

export default likesRepository;