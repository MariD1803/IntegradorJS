import {Router} from "express"
import {ProductoController} from '../controllers/producto.controller'

const router = Router()

router.put('/producto', async (request,response) => 
    ProductoController.add(request,response)
)

router.post('/producto', async (request,response) => 
    ProductoController.retrieve(request,response)
)

router.post('/producto/:id', async (request,response) =>
    ProductoController.retrieveById(request,response)
)

router.patch('/producto/:id', async (request,response) =>
    ProductoController.modify(request,response)
)

router.delete('/producto/:id', async (request,response) => 
    ProductoController.supress(request,response)
)

export default router