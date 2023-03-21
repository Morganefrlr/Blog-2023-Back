import mongoose from 'mongoose'



const PostSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        desc:{
            type:String,
            required:true,
        },
        photo:{
            type:String,
            required:true,
        },
        tags:{
            type:[String],
            required:true
        },
    },
    { timestamps: true}
)


const PostModel = mongoose.model('post', PostSchema) 
export default PostModel