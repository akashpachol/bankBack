import express from 'express'
const router = express.Router()


import jwtTokenVerification from '../middleware/jwtmiddleware.js'
import { disableUser, getAllUsers, getUserById, loginAdminController } from '../Controller/adminController.js'
 




router.post("/", loginAdminController)


router.patch("/disableUser",jwtTokenVerification, disableUser)
router.get("/users/:id",jwtTokenVerification,getUserById)
router.get("/users",jwtTokenVerification, getAllUsers)












export default router