import db from "../config/db.js";

async function getUsers(id, user){
    const aux =`${user}%`;
    return db.query(`SELECT id, "userName", image
        FROM users 
        WHERE id != $1 
        AND "userName" 
        LIKE $2`, 
        [id, aux]);
}

async function getFollowers(id){
    return db.query(
        `SELECT "followerId"
        FROM followers
        WHERE "userId" = $1`, [id])
}

const searchRepository = {
    getUsers,
    getFollowers
}

export default searchRepository;