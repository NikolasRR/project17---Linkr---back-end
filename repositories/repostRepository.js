import db from "../config/db.js";

async function getPublications(userId) {
    return await db.query(
        `SELECT users.id as "userId", publications.id as "publicationId", publications.content, publications.url, 
        COUNT(likes."publicationId") as "totalLikes", users."userName", users.image as profile, links.* ,
        (SELECT COALESCE(COUNT("publicationId"), 0) from repost where "publicationId" = publications.id) as resposts
        FROM publications 
        LEFT JOIN likes
        ON publications.id = likes."publicationId"
        JOIN users 
        ON publications."idUser" = users.id 
        JOIN links
        ON links.id = publications."linkId"
        WHERE publications."idUser" = $1 
        GROUP BY publications.id,users."userName", users.image,likes."publicationId",links.id,users.id
        ORDER BY  publications."createdAt" DESC `,[userId]
    )
    
}

async function getReposts(userId){
    return await db.query(
        `SELECT users.id as "userId", publications.id as "publicationId", publications.content, publications.url, 
        COUNT(likes."publicationId") as "totalLikes", users."userName", users.image as profile, 
        links.id, links.title, links.description, links.image, links.link,
        (SELECT COALESCE(COUNT("publicationId"), 0) from repost where "publicationId" = publications.id) as resposts, repost."createdAt", repost."userId" as "repostId",u2.id as "localId" , u2."userName" as "repostedBy"
                FROM publications 
                JOIN repost
                ON publications.id = repost."publicationId"
                LEFT JOIN users u2
                ON u2.id = repost."userId"
                LEFT JOIN likes
                ON publications.id = likes."publicationId"
                JOIN users 
                ON publications."idUser" = users.id 
                JOIN links
                ON links.id = publications."linkId"
                WHERE repost."userId" = $1
                GROUP BY publications.id,users."userName", users.image,likes."publicationId",links.id,users.id,repost."createdAt",  repost."userId",  u2."userName", u2.id
                ORDER BY  repost."createdAt" DESC`,[userId])
}

const repostRepository = {
    getPublications,
    getReposts
}

export default repostRepository