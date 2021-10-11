const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const PokemonsRoutes = require('./pokemons.js');
const PokePost = require('./pokemon.js');
const TypesRoutes = require('./types.js');

// Configurar los routers
// Aqui van los middlewares
// Ejemplo: router.use('/auth', authRouter);

//Probar de poner TypesRoutes en la ruta de /pokemons para ver si al entrar al hom se cargan...
router.use('/pokemons', PokemonsRoutes); //HOME, NAME, ID
router.use('/pokemon', PokePost); // POST
router.use('/types', TypesRoutes); //TYPES

module.exports = router;
