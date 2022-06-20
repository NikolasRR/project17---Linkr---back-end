import db from "../config/db.js";

async function getTrending() {
    return db.query(`
        SELECT COUNT(ph), h.content
        FROM hashtags h
        JOIN "publicationHashtag" ph ON h.id = ph."hashtagId"
        GROUP BY h.content
        ORDER BY count DESC
        LIMIT 10
        `)
}

async function getPublicationsByHashTag(hashTag) {
    return db.query(`
        SELECT users.id as "userId", publications.id as "publicationId", publications.content, publications.url, COUNT(likes."publicationId") as "totalLikes", users."userName", users.image as profile, links.* 
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
    getPublicationsByHashTag,
}

export default hashTagsRepository;