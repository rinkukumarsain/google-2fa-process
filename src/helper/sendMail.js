const nodemailer=require('nodemailer')
const mail=(to,sub,msg)=>{
let transport=nodemailer.createTransport(
    {
        service:'gmail',
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    }
)
var mailoption={
    from:process.env.EMAIL,
    to:to,
    subject:sub,
    html:msg
}
transport.sendMail(mailoption,function(err,info){
    try{
        if(err)
        {
            console.log(err)
        }
        else{
            console.log("email sent",)
        }

    }catch(e){
        console.log(e)
    }
 
})
}
function genrateotp(msg)
{     
return(` <div id="otp" style="
    padding: 10px;
    text-align: center;
    background: rgb(40, 48, 70);
    color: rgb(208, 210, 214);
    border-radius: 10px;">
   ${msg}
</div>`)
}

module.exports={mail,genrateotp}