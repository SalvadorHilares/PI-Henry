const { Router } = require('express');
const { getAllDogs,
        getSpecificName,
        getSpecificBreed,
        createBreed,
        getTemper,
        sortDogs,
        deleteBreed
        } = require('../controllers/dog.controllers')


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/dogs', getAllDogs);
router.get('/dogs?name=:name_dog',getSpecificName);
router.get('/dogs/:idRaza',getSpecificBreed);
router.post('/dogs',createBreed);
router.get('/temperaments',getTemper);
router.post('/sort', sortDogs);
router.delete('/dogs/:id', deleteBreed)

module.exports = router;