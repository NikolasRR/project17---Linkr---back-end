import db from "../config/db.js";

async function verifyUser(id){
    return db.query(
        `SELECT * FROM users where id=$1`,[id])
}

async function postPublication(id,text,url){
    return await db.query(`INSERT INTO publications ("idUser",content,url) VALUES ($1,$2,$3)`,[id,text,url])
}

const postsRepository = {
    verifyUser,
    postPublication
}

export default postsRepository;