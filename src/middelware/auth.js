let session=require('express-session')

let auth=async(req,res,next)=>{
try{
    if(req.session.data){
        next();
    }else{
        res.redirect('/login')
    }
}catch(e){
    console.log(e)
}
  
}
module.exports=auth