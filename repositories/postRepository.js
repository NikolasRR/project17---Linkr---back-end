import db from "../config/db.js";

async function verifyUser(id){
    return db.query(
        `SELECT * FROM users where id=$1`,[id])
}

async function postPublication(id,text,url){
    return await db.query(`INSERT INTO publications ("idUser",content,url) VALUES ($1,$2,$3)`,[id,text,url])
}

async function getPublications(){
    return await db.query(`SELECT publications.content, publications.url, COALESCE(SUM(likes."publicationId"),0) as "totalLikes", users."userName", users.image 
    FROM publications
    LEFT JOIN likes
    ON publications.id = likes."publicationId"
    JOIN users 
    ON publications."idUser" = users.id
    GROUP BY publications.id,users."userName", users.image,likes."publicationId"
    ORDER BY publications."createdAt" DESC LIMIT 20`)
}

const postsRepository = {
    verifyUser,
    postPublication,
    getPublications
}

export default postsRepository;