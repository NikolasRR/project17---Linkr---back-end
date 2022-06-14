import db from "../config/db.js";

async function getUserByEmail (email) {
	return connection.query('SELECT * FROM users WHERE email = $1', [email]);
}

export const userRepository = {
	getUserByEmail
}