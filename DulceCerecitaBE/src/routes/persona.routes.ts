import {Router} from "express"
import {PersonaController} from '../controllers/persona.controller'

const router = Router()

router.put('/persona', async (request,response) => 
    PersonaController.add(request,response)
)

router.post('/persona', async (request,response) => 
    PersonaController.retrieve(request,response)
)

router.post('/persona/:id', async (request,response) =>
    PersonaController.retrieveById(request,response)
)

router.patch('/persona/:id', async (request,response) =>
    PersonaController.modify(request,response)
)

router.delete('/persona/:id', async (request,response) => 
    PersonaController.supress(request,response)
)

export default router