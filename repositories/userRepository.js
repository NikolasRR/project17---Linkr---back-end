import db from "../config/db.js";

async function getUserPublications(id){
    return await db.query(`SELECT publications.id as "publicationId", links.id, publications.content, publications.url, COUNT(likes."publicationId") as "totalLikes", 
    users."userName", users.image as profile, links.* 
    FROM publications
    LEFT JOIN likes
    ON publications.id = likes."publicationId"
    JOIN users 
    ON publications."idUser" = users.id
    JOIN links
    ON links.id = publications."linkId"
    LEFT JOIN "publicationHashtag" as hash_link
    ON hash_link."publicationId" = publications.id
    LEFT JOIN hashtags as hash
    ON hash.id = hash_link."hashtagId"
    WHERE publications."idUser" = $1
    GROUP BY publications.id,users."userName", users.image,likes."publicationId",links.id
    ORDER BY publications."createdAt" DESC LIMIT 20
    `,[id])
}

const userRepository = {
    getUserPublications    
}

export default userRepository;