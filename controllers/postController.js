import db from "./../config/db.js"

export async function postPublication(req,res){ 
    try{
        const {user,publicationData} = res.locals    
        const {rows} = await db.query(`SELECT * FROM users where id=$1`,[user.id])

        if(rows.length===0){
            return res.status(401).send("Você não tem cadastro")
        }

        await db.query(`INSERT INTO publications ("idUser",content,url) VALUES ($1,$2,$3)`,[user.id, publicationData.text, publicationData.url])
        res.sendStatus(200)

    }catch(e){
        console.error(e)
        res.sendStatus(500)
    }
}