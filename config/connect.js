import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({path:'./config/.env'})
mongoose.set('strictQuery', true)

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology:true } 
)
.then(() => console.log('Connexion à MongoDB réussi!'))
.catch(() => console.log('Connexion à MongoDb échouée!'))

