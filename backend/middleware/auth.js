import jwt from 'jsonwebtoken'
export const protect=(req,res,next)=>{
      try{

        const authHeader=req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({err:"Unauthorized"})
        }
        const token=authHeader.split(" ")[1];
        const session=jwt.verify(token,process.env.SECRET_KEY)

        if(!session){
            return res.status(401).json({err:"Unauthorized"})
        }

        req.session=session;
        next();

      }
      catch(err){
            return res.status(401).json({err:"Unauthorized"})


      }
}


export const protectAdmin= (req,res,next)=>{

    if(req?.session?.role!=="ADMIN"){
        return res.status(403).json({err:"Admin access required"})
    }

    next();

}