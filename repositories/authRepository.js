import db from "../config/db.js";

async function insertNewUser(email, password, userName, image) {
    return db.query(`
        INSERT INTO users (email, password, "userName", image)
        VALUES ($1, $2, $3, $4)`,
        [email, password, userName, image]);
}

async function getUserByEmail(email) {
    return db.query(`
        SELECT * FROM users
        WHERE email = $1`,
        [email]);
}

async function getUserByName(name) {
    return db.query(`
        SELECT * FROM users
        WHERE "userName" = $1`,
        [name]);
}

const authRepository = {
    insertNewUser,
    getUserByEmail,
    getUserByName
}

export default authRepository;