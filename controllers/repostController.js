import repostRepository from "../repositories/repostRepository.js";
import postsRepository from "../repositories/postRepository.js";

export async function getRepublications(req, res) {
    // const {id} = req.params;
    const userId = res.locals.user.id
    try {
        // const { rows: posts } = await repostRepository.getPublications(id);
        // const { rows: reposts} = await repostRepository.getReposts(id);
        const {rows:followers} = await postsRepository.getUserFollowers(userId) 
        if(followers.length===0){
            return res.status(200).json({ "data":[], "message":"You don't follow anyone yet. Search for new friends!"})
        } 
        
        const { rows: posts } = await repostRepository.getPublications();    
       
        const { rows: reposts} = await repostRepository.getReposts();        

        for(let i in reposts){
            reposts[i]={...reposts[i], "isRepost":true}
        }
        const allPosts = posts.concat(reposts);
        allPosts.sort((a, b)=> {
            return b.createdAt - a.createdAt;
        });

        let followersPosts =[]

        for (let post of allPosts){        
            for(let follower of followers ) {
                if(post.userId === follower.followerId || post.repostId === follower.followerId ){    
                    followersPosts.push(post)
                }  
            }       
        }

        if(followersPosts.length===0){
            return res.status(200).json({ "data":[], "message":"No posts found from your friends"})
        }

        res.status(200).json({ "data":followersPosts, "message":"OK"})

    } catch (e) {
        console.error(e)
        res.sendStatus(500)
    }
}

export async function postResposts(req, res){
    const{userId, postId} = req.body
    try {
        await repostRepository.setRepost(userId, postId)
        res.sendStatus(201);
    } catch (error) {
        res.sed(error).status(500);
    }
}
