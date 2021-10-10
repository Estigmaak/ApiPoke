import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes } from '../actions'

export default function PokemonCreate() {
    const dispatch = useDispatch();
    //const history = useHistory();
    const pokeTypes = useSelector((state) => state.pokeTypes)

    // name, hp, attack, defense, speed, height, weight, image, types
    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        types: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types,e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postPokemon(input))
        alert('Pokemon Created!')
        setInput({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            image: '',
            types: []
        })
        //history.push('/home')
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    return (
        <div>
            <Link to={'/home'}><button>Home</button></Link>
            <h2>Crea tu Pokemon!</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input
                        type= "text"
                        value= {input.name}
                        name= 'name'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Hp:</label>
                    <input
                        type= "number"
                        value= {input.hp}
                        name= 'hp'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Attack:</label>
                    <input
                        type= "number"
                        value= {input.attack}
                        name= 'attack'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Defense:</label>
                    <input
                        type= "number"
                        value= {input.defense}
                        name= 'defense'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Speed:</label>
                    <input
                        type= "number"
                        value= {input.speed}
                        name= 'speed'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Height:</label>
                    <input
                        type= "number"
                        value= {input.height}
                        name= 'height'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                        type= "number"
                        value= {input.weight}
                        name= 'weight'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type= "text"
                        value= {input.image}
                        name= 'image'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {pokeTypes.map((type) => (
                        <option value={type.name}>{type.name}</option>
                    ))}
                </select>
                <ul><li>{input.types.map(e => e + ' ,')}</li></ul>
                <button type="submit">Crear Pokemon</button>
            </form>
        </div>
    )
}