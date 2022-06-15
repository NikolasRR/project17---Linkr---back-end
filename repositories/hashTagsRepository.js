import db from "../config/db.js";

async function getTrending() {
    return db.query(
        `SELECT "content" 
        FROM hashtags 
        ORDER BY count DESC 
        LIMIT 10
        `)
}



const hashTagsRepository = {
    getTrending
}

export default hashTagsRepository;