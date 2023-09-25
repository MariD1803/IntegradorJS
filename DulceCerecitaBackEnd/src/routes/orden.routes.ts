import {Router} from "express"
import {OrdenController} from '../controllers/orden.controller'

const router = Router()

router.put('/orden', async (request,response) => 
    OrdenController.add(request,response)
)

router.post('/orden', async (request,response) => 
    OrdenController.retrieve(request,response)
)

router.post('/orden/:id', async (request,response) =>
    OrdenController.retrieveById(request,response)
)

export default router