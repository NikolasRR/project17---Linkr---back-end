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

export async function getFollowing(req,res){
    try{
        const followerId = parseInt(req.params.id)
        const userId = res.locals.user.id
        const {rows} = await userRepository.getUserFollower(userId, followerId);       
        res.status(200).send(rows)
    }catch(e){
        console.error(e)
        res.sendStatus(500)
    }
}

export async function postFollower(req,res){
    try{
        const followerId = parseInt(req.params.id)
        const { user } = res.locals    
        const userId = user.id

        await userRepository.postUserFollower(userId, followerId);       
        res.sendStatus(200)
    }catch(e){
        console.error(e)
        res.sendStatus(500)
    }
}

export async function deleteFollower(req,res){
    try{
        const followerId = parseInt(req.params.id)
        const { user } = res.locals    
        const userId = user.id

        await userRepository.deleteFollower(userId, followerId);       
        res.sendStatus(200)
    }catch(e){
        console.error(e)
        res.sendStatus(500)
    }
}

