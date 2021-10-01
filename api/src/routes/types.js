const { Router } = require('express');
//const { Op } = require('sequelize');
const { Pokemon, Type } = require('../db.js');
const axios = require('axios');

const router = Router();

router.get('/', async (req, res) => {
    try {
        const typesDb = await Type.findAll();
        if(typesDb.length !== 0) {
            console.log('Es de la db')
            const types = typesDb.map(type => type.name)
            res.json(types)
        } else {
            const responseApi = await axios(`https://pokeapi.co/api/v2/type`)
            const resultsApi = responseApi.data.results.map(e => e.name);
            // Aqui ya tengo el array [type, type2, ...]
            const createInDb = resultsApi.map( type => {
                if(type !== '') {
                    Type.findOrCreate({
                        where: {
                            name : type
                        },
                    })
                }
            })
            console.log('Es de la api')
            res.json(resultsApi)
        }
    } catch (error) {
        console.error(error)
    }
})

module.exports = router;