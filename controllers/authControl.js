import UserModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


export const register = (req, res) =>{
    UserModel.findOne({email: req.body.email})
    .then(user => {
        if(user){
            return res.status(401).json({message : 'Email déjà utilisé!'})
        }
         bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const user = new UserModel({
                email:req.body.email,
                name:req.body.name,
                photo:req.body.photo,
                password:hash
            })
        
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé correctement!'}))
                .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({error}))
   
}

export const login = (req, res, next) =>{
    UserModel.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            return res.status(401).json({message : 'Paire Email/Mot de passe éronnée!'})
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if(!valid){
                return res.status(401).json({message : 'Paire Email/Mot de passe éronnée!'})
            } 
            else{
                const token = jwt.sign(
                    {userId : user._id, userName: user.name},
                    process.env.TOKEN_SECRET,
                    { expiresIn: '24h'})
                res.cookie('accessToken', token,{
                    httpOnly : true,
                    secure: true,
                    sameSite:'none'
                })
                res.status(200).json({
                userId:user._id,
                })
            }
            
        })
        .catch(error => res.status(500).json({error}))
    })
    .catch(error => res.status(500).json({error}))
}

export const logout = (req, res, next) =>{
    res.clearCookie('accessToken', {
        secure:true,
        sameSite:'none'
    }).status(200).json("L'utilisateur a bien été deconnecté!")
}