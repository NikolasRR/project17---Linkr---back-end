import userRepository from "../repositories/userRepository.js"

export async function getUserPublications(req,res){

    try{
        const {id} = req.params
        const {rows} = await userRepository.getUserPublications(id);
        res.status(200).send(rows)

    }catch(e){
        console.error(e)
        res.sendStatus(500)
    }
}