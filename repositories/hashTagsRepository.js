import db from "../config/db";

async function getTrending() {
    return db.query(
        `SELECT * 
        FROM hashtags 
        ORDER BY count DESC 
        LIMIT 10
        `)
}

async function getPostsByHashTag(hashTag) {
    return db.query(
        `SELECT * 
        FROM "publicationHashtag"
        JOIN publications ON "publicationHashtag"."publicationId" = publications.id
        JOIN hashtags ON "publicationHashtag"."hashtagId" = hashtags.id
        WHERE hashtags = ${hashTag}`);
}

const hashTagsRepository = {
    getTrending
}

export default hashTagsRepository;