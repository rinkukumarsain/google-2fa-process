let mongoose=require('mongoose')
let registerSchema=mongoose.Schema({

    email:{
        type:String,
        require:true,
        unique:true
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    otp:{
        type:Number
    },
    secret:{
        type:Object
    },
    QRCodeUrl:{
        type:String
    },
    FA:{
        type:Number,
        default:0
    },
    createdAt: {type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
    
  
},{ versionKey: false })

let registerModel=new mongoose.model('register',registerSchema)
module.exports=registerModel