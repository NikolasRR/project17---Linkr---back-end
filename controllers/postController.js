import postsRepository from "../repositories/postRepository.js"

export async function postPublication(req,res){ 
    try{
        const {id} = res.locals.user  
        const {text,url} = res.locals
        
        const {rows} = await postsRepository.verifyUser(id);

        if(rows.length===0){
            return res.status(401).send("Você não tem cadastro")
        }

        await postsRepository.postPublication(id, text, url);
        res.sendStatus(200)

    }catch(e){
        console.error(e)
        res.sendStatus(500)
    }
}

export async function getPublications(req,res){

    try{
        const {rows} = await postsRepository.getPublications();
        if(rows.length===0){
            return res.status(404).send("Ainda não há publicações")
        }

        res.status(200).send(rows)

    }catch(e){
        console.error(e)
        res.sendStatus(500)
    }
}