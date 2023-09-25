import {Router} from "express"
import { UsuarioController } from "../controllers/usuario.controller"

const router = Router()

router.post('/usuario', async (request,response) => 
    UsuarioController.getSession(request,response)
)

export default router