import express from 'express'
const router = express.Router()
import { deleteUser, readOneUser, updateUser } from '../controllers/userControl.js'
import { auth }from '../middleware/auth.js'

router.get('/:id', readOneUser)
router.put('/:id',auth, updateUser)
router.delete('/:id',auth, deleteUser)



export default router