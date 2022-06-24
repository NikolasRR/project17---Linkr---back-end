import searchRepository   from "../repositories/searchRepository.js";

export async function searchUsers(req, res) {
    const repository = searchRepository
    try {
        const {rows: users} = await repository.getUsers(res.locals.user.id, req.params.user);
        const {rows: followerId} = await repository.getFollowers(res.locals.user.id);
        const arr =[];
        const result = [];
        for(let i of followerId){
            arr.push(i.followerId)
        }
        for(let i of users){
            if(arr.includes(i.id)){
                i={...i, follower: true}
                result.unshift(i);
            }else{
                result.push(i)
            }
        }
        res.status(200).json(result);
    }catch(err){
        res.status(500).send(err);
    }
}  