export async function postPublication(req,res){ 
    try{
        const userId = res.locals.userId
        
        await debug.query(`INSERT INTO post`)
        

    }catch(e){
        
    }
}