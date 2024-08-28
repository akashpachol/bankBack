import express from 'express'
const router = express.Router()

import { loginUserController, userRegisterController} from '../Controller/userController.js'
import jwtTokenVerification from '../middleware/jwtmiddleware.js'
import { deposit, getTranscation, withdraw } from '../Controller/accountController.js'
 



router.post("/register", userRegisterController)
router.post("/login", loginUserController)


router.post("/deposit",jwtTokenVerification, deposit)
router.post("/withdraw",jwtTokenVerification, withdraw)
router.get("/transaction",jwtTokenVerification, getTranscation)












export default router