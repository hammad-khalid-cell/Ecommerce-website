export const authorizeRoles  =  (allowedRole) =>{
    return (request, response, next)=>{
        if(!request.user || allowedRole !== request.user.role){
            return response.status(403).json({error :  "Acess denied"});
        }
        next();
    }
}



