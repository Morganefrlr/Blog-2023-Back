import PostModel from '../models/postModel.js'
import fs from 'fs'


export const createPost = (req, res) =>{
    const postObject = req.body
    delete postObject._id
    delete postObject._userId
    const post = new PostModel({
        ...postObject,
        userId: req.auth.userId,
    })
    post.save()
        .then(() => res.status(201).json({ message: 'Post créé correctement!', post}))
        .catch(error => res.status(400).json({error}));
}




export const readOnePost = (req, res) =>{
    PostModel.findOne({_id : req.params.id})
    .then((post) =>{
        res.status(200).json(post)
    })
    .catch((error) =>{
        res.status(404).json({error})
    })
}





export const readAllPosts = (req, res) =>{
    PostModel.find()
    .then((posts =>{
        res.status(200).json(posts)
    }))
    .catch((error) =>{
        res.status(400).json({error})
    })
}





export const updatePost = (req, res) =>{
    PostModel.findOne({_id : req.params.id})
    .then((post) =>{
        if(post.userId !== req.auth.userId){
            res.status(401).json({ message: 'Not Authorized!' })
        }
        else{
            delete req.body.userId
            PostModel.updateOne({_id:req.params.id}, {...req.body, _id:req.params.id})
                .then(() => res.status(200).json({ message : 'Post modifié correctement!'}))
                .catch(error => res.status(401).json({error}))
        }
    })
    .catch((error) =>{
        res.status(400).json({error})
    })
}




export const deletePost = (req, res) =>{
    PostModel.findOne({ _id: req.params.id})
    .then(post => {
        if(post.userId !== req.auth.userId){
            res.status(401).json({ message: 'Not Authorized!' })
        } else{
            fs.unlink(`images/${post.photo}`, () =>{
                PostModel.deleteOne({_id : req.params.id})
                .then(() => {res.status(200).json({message : 'Post supprimé correctement!'})})
                .catch(error => res.status(401).json({error}))
            })
            
        }
    })
    .catch(error => res.status(500).json({error}))
}
