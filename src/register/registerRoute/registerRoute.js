
let express=require('express')
let router=express.Router()
let auth=require('../../middelware/auth')
let{register,login,postRegister,postLogin,index,logout}=require('../registerController/registerController')
router.get('/',register)
router.get('/login',login)
router.post('/postRegister',postRegister)
router.post('/postLogin',postLogin)
router.get('/index',auth,index)
router.get('/logout',logout)
module.exports=router