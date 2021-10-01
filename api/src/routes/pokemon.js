const { Router } = require('express');
const { v4:uuidv4 } = require('uuid');
const { Pokemon, Type } = require('../db.js');

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;
        //console.log(name, hp, attack, defense, speed, height, weight, image, types);
        let idTypes;

        const createPoke = await Pokemon.create({
            id: uuidv4(),
            name,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            image
        })

        for(let i = 0; i < types.length; i++) {
            try {
                idTypes = await Type.findAll({
                    where: { name : types[i] },
                })
                createPoke.addType(idTypes);
            } catch (error) {
                res.status(404).send(error);
            }
        }
    } catch (error) {
        console.error(error);
    }
    res.send("ok")
})

module.exports = router;
