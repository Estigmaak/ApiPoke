const { Router } = require('express');
const { Op } = require('sequelize');
const { Pokemon, Type } = require('../db.js');
const axios = require('axios');

const router = Router();


const getApiInfo = async () => {
    const prim20 = await axios(`https://pokeapi.co/api/v2/pokemon`);
    const seg20 = await axios(prim20.data.next);
    const pokes40 = prim20.data.results.concat(seg20.data.results);
    
    try {
        const apiInfo = pokes40.map(e => axios(e.url))
        let dataPoke = Promise.all(apiInfo)
        .then(e => {
            let pokemon = e.map(e => e.data)
            let data = []
            pokemon.map(e => {
                data.push({
                    id: e.id,
                    name: e.name,
                    hp: e.stats[0].base_stat,
                    attack: e.stats[1].base_stat,
                    defense: e.stats[2].base_stat,
                    speed: e.stats[5].base_stat,
                    height: e.height,
                    weight: e.weight,
                    image: e.sprites.other.dream_world.front_default,
                    types: e.types.length < 2 ? [{name: e.types[0].type.name}] : [{name: e.types[0].type.name}, {name: e.types[1].type.name}]
                })
            })
            return data;
            // res.json(data);
        })
        // console.log(dataPoke);
        return dataPoke;
    } catch (error) {
        console.error("Could not bring the information from the API",error)
    }
}

const getDbInfo = async () => {
    return await Pokemon.findAll({
        include:{
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllPokes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal
}


router.get('/', async (req, res, next) => {
    const { name } = req.query;
    let allPokes = await getAllPokes();
    
    if(name) {
        // let pokeName = await allPokes.filter(e => e.name.toLowerCase().includes(name.toLocaleLowerCase()))
        let pokeName = await allPokes.filter(e => e.name.toLowerCase() === name.toLocaleLowerCase())
        pokeName.length ?
        res.status(200).send(pokeName) :
        res.status(404).send('Sorry, Pokemon name not found...');
    } else {
        res.status(200).send(allPokes)
    }
}),

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const allPokes = await getAllPokes();

    if(id) {
        let pokeId = await allPokes.filter(e => e.id == id)
        pokeId.length ?
        res.status(200).json(pokeId) :
        res.status(404).send('Sorry, Pokemon no found...');
    //     if(pokeId.length) {
    //         res.status(200).json(pokeId) 
    //     } else {
    //         res.status(404).send('Sorry, Pokemon ID not found...');
    //     }
    // } else {
    //     res.status(200).send(allPokes)
    }
})

// router.get('/:id', async (req, res, next) => {
    //     try {
//         const { id } = req.params;
        
//         if(id?.length > 8) {
//             const resultsDb = await Pokemon.findByPk(id, {
//                 include: { model: Type },
//                 attributes: { exclude: 'typeId'}
//             });
            
//             if(resultsDb.length !== 0) {
//                 return res.json(resultsDb);
//             } else {
//                 return res.send("Oops ... this Pokemon doesn't exist...")
//             };
//         } else {
//             const responseApi = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
//             const resultsApi = await responseApi.data
//             res.send(resultsApi)
//         }
//     } catch (error) {
//         console.error(error.message)
//     }
// })


module.exports = router;