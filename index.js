import express from 'express'
import './config/connect.js'
import dotenv from 'dotenv'
dotenv.config({path:'./config/.env'})
import {cors} from "./middleware/cors.js"
import cookieParser from 'cookie-parser'
import multer from 'multer'

const app = express()
const PORT = process.env.PORT || 8800


app.use((req,res, next) =>{
    res.header('Access-Control-Allow-Credentials', true)
    next()
})
app.use(express.json())
app.use(cors)
app.use(cookieParser())



import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use("/images", express.static(path.join(__dirname, "/images")));
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
  });




import authRoute from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'
import userRoute from './routes/userRoute.js'



app.use('/api/auth', authRoute)
app.use('/api/post', postRoute)
app.use('/api/user', userRoute)




app.listen(PORT ,() => {
  console.log(`Server connecté sur le port ${PORT} !`)
})