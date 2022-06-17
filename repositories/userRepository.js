import db from "../config/db.js";

async function getUserPublications(){
    return await db.query(`SELECT publications.content, publications.url, COUNT(likes."publicationId") as "totalLikes", users."userName", users.image as profile, links.* 
    FROM publications
    LEFT JOIN likes
    ON publications.id = likes."publicationId"
    JOIN users 
    ON publications."idUser" = users.id
    JOIN links
    ON links.id = publications."linkId"
    GROUP BY publications.id,users."userName", users.image,likes."publicationId",links.id
    ORDER BY publications."createdAt" DESC LIMIT 20
    `)
}

const userRepository = {
    getUserPublications    
}

export default userRepository;