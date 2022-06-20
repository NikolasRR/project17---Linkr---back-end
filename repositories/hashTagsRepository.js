import db from "../config/db.js";

async function getTrending() {
    return db.query(
        `SELECT "content" 
        FROM hashtags 
        ORDER BY count DESC 
        LIMIT 10
        `)
}

async function getPublicationsByHashTag(hashTag) {
    return db.query(
        `SELECT publications.id as "publicationId", publications.content, publications.url, COUNT(likes."publicationId") as "totalLikes", 
            users.id as "userId", users."userName", users.image as profile, links.* 
        FROM publications
        LEFT JOIN likes
        ON publications.id = likes."publicationId"
        JOIN users 
        ON publications."idUser" = users.id
        JOIN links
        ON links.id = publications."linkId"
        JOIN "publicationHashtag" as hash_link
        ON hash_link."publicationId" = publications.id
        JOIN hashtags as hash
        ON hash.id = hash_link."hashtagId"
        WHERE hash.content = $1
        GROUP BY publications.id,users."userName", users.image,likes."publicationId",links.id, users.id
        ORDER BY publications."createdAt" DESC LIMIT 20`, [hashTag]
    )
}
const hashTagsRepository = {
    getTrending,
    getPublicationsByHashTag
}

export default hashTagsRepository;