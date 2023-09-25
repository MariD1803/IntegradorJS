import {Router} from "express"
import {Mensaje} from '../models/mensaje'
import {MensajeController} from '../controllers/mensaje.controller'
import { DBError, DBHTTPDict } from "../utils/db"

const router = Router()

router.put('/mensaje', async (request,response) => 
    MensajeController.add(request,response)
)

router.post('/mensaje', async (request,response) => 
    MensajeController.retrieve(request,response)
)

router.post('/mensaje/:id', async (request,response) =>
    MensajeController.retrieveById(request,response)
)

router.patch('/mensaje/:id', async (request,response) =>
    MensajeController.modify(request,response)
)

router.delete('/mensaje/:id', async (request,response) => 
    MensajeController.supress(request,response)
)

export default router