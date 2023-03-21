import UserModel from '../models/userModel.js'
import PostModel from '../models/postModel.js'
import fs from 'fs'


export const readOneUser = (req, res) =>{
    UserModel.findOne({_id : req.params.id})
    .then((user) =>{
        PostModel.find({userId : user._id})
        .then((posts) =>{
            res.status(200).json({user , posts})
        })
    })
    .catch((error) =>{
        res.status(404).json({error})
    })
}





export const updateUser =(req, res) =>{
    UserModel.findOne({_id : req.params.id})
    .then((user) =>{
        if(user.id !== req.auth.userId){
            res.status(401).json({ message: 'Not Authorized!' })

        }
        else {
            UserModel.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
            .then(() => res.status(200).json({ message : 'User modifié correctement!'}))
            .catch(error => res.status(401).json({error}))
        }
    })
    .catch((error) =>{
        res.status(400).json({error})
    })
}






export const deleteUser = (req,res) =>{
    UserModel.findOne({ _id: req.params.id})
    .then(user => {
        if(user.id !== req.body.userId){
            res.status(401).json({ message: 'Not Authorized!' })
        } else{
            fs.unlink(`images/${user.photo}`, () =>{
                UserModel.deleteOne({_id : req.params.id})
                .then(() => {res.status(200).json({message : 'User supprimé correctement!'})})
                .catch(error => res.status(401).json({error}))
            })
        }
    })
    .catch(error => res.status(500).json({error}))
}