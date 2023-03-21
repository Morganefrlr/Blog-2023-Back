import express from 'express'
const router = express.Router()
import { createPost, readOnePost, readAllPosts, updatePost, deletePost} from '../controllers/postControl.js'
import { auth }from '../middleware/auth.js'


router.post('/',auth, createPost )
router.get('/:id',auth, readOnePost )
router.get('/',auth, readAllPosts )
router.put('/:id',auth,updatePost )
router.delete('/:id',auth, deletePost )


export default router