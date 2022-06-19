import db from "../config/db.js";

export async function getUsers(user){
    const aux =`${user}%`;
    return db.query(`SELECT id, "userName", image
        FROM users 
        WHERE "userName" 
        LIKE $1`, 
        [aux]);
}