export async function getUserPublications(req,res){

    try{
        const {rows} = await postsRepository.getPublications();
        res.status(200).send(rows)

    }catch(e){
        console.error(e)
        res.sendStatus(500)
    }
}