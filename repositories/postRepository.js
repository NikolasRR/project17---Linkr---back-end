import db from "../config/db.js";

async function verifyUser(id) {
    return db.query(`SELECT * FROM users where id=$1`, [id])
}

async function postLink(title, description, image, link) {
    return await db.query(`
    INSERT INTO links (title,description,image,link) VALUES ($1,$2,$3,$4) RETURNING id`, [title, description, image, link])
}

async function postPublication(id, text, url, linkId) {
    return await db.query(`
    INSERT INTO publications ("idUser",content,url,"linkId") VALUES ($1,$2,$3,$4) RETURNING id`, [id, text, url, linkId])
}

async function getPublications() {
    return await db.query(`
        SELECT users.id as "userId", publications.id as "publicationId", publications.content, publications.url, COUNT(likes."publicationId") as "totalLikes", users."userName", users.image as profile, links.* 
        FROM publications
        LEFT JOIN likes
        ON publications.id = likes."publicationId"
        JOIN users 
        ON publications."idUser" = users.id
        JOIN links
        ON links.id = publications."linkId"
        GROUP BY publications.id,users."userName", users.image,likes."publicationId",links.id,users.id
        ORDER BY publications."createdAt" DESC LIMIT 20
    `)
}

async function getPublication(postId, userId) {
    return db.query(`
        SELECT * 
        FROM publications
        WHERE id = $1 AND "idUser" = $2
    `, [postId, userId]);
}

async function deletePost(linkId) {
    return db.query(`DELETE FROM links WHERE id = $1 RETURNING *;`, [linkId]);
}
async function getHashtag(hashtag){
    return await db.query(`SELECT * FROM hashtags where content=$1`,[hashtag])
}

async function postHashtag(hashtag){
    return await db.query(`INSERT INTO hashtags (content) VALUES ($1) RETURNING id`,[hashtag])
}

async function postPublicationHashtag(postId,hashtagId){
    return await db.query(`INSERT INTO "publicationHashtag" ("publicationId","hashtagId") VALUES ($1,$2)`,[postId,hashtagId])
}

async function addCountHashtag(hashtagId){
    return await db.query(`UPDATE hashtags SET count=count+1 WHERE id=$1`,[hashtagId])
}

async function editPostContent (postId, content) {
    return db.query(`
        UPDATE publications
        SET content = $2
        WHERE id = $1
    `, postId, content)
}

async function deleteExistingPostHashtags (postId) {
    return db.query(`
        DELETE FROM 
        "publicationHashtag"
        WHERE "publicationId" = $1
        RETURNING *
    `, [postId]);
}

const postsRepository = {
    verifyUser,
    postLink,
    postPublication,
    getPublications,
    getPublication,
    deletePost,
    editPostContent,
    deleteExistingPostHashtags,
    getHashtag,
    postHashtag,
    postPublicationHashtag,
    addCountHashtag
}

export default postsRepository;