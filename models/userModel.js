import mongoose from 'mongoose'
import validator from 'mongoose-unique-validator'


const UserSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            lowerase:true,
        },
        password:{
            type:String,
            required:true,
        },
        name:{
            type:String,
            required:true,
        },
        photo:{
            type:String,
            //required:true,
        },
        shortBio:{
            type:String,
        },
        bio:{
            type:String,
        },
        facebook:{
            type:String,
        },
        instagram:{
            type:String,
        },
        pinterest:{
            type:String,
        },
        youtube:{
            type:String,
        },

    }
)

UserSchema.plugin(validator);
const UserModel = mongoose.model('user', UserSchema) 
export default UserModel