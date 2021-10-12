import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getTypes } from '../actions'

function inputValidate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Name required';
    } else if (!input.hp) {
        errors.hp = 'Hp required';
    } else if (!input.attack) {
        errors.attack = 'Attack required';
    } else if (!input.defense) {
        errors.defense = 'Defense required';
    } else if (!input.speed) {
        errors.speed = 'Speed required';
    } else if (!input.height) {
        errors.height = 'Height required';
    } else if (!input.weight) {
        errors.weight = 'Weight required';
    } else if (!input.image) {
        errors.image = 'Image URL required';
    }
    return errors;
}

export default function PokemonCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const pokeTypes = useSelector((state) => state.pokeTypes)
    const [errors,setErrors] = useState({})

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
        setErrors(inputValidate({
            ...input,
            [e.target.name] : e.target.value,
            [e.target.hp] : e.target.value,
            [e.target.attack] : e.target.value,
            [e.target.defense] : e.target.value,
            [e.target.speed] : e.target.value,
            [e.target.height] : e.target.value,
            [e.target.weight] : e.target.value,
            [e.target.image] : e.target.value,
        }))
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
        history.push('/home')
    }

    // function handleDelete(el) {
    //     setInput({
    //         ...input,
    //         pokeTypes: input.pokeTypes.filter( type => type !== el)
    //     })
    // }

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    return (
        <div>
            <Link to={'/home'}><button>Home</button></Link>
            <h2>Crea tu Pokemon!</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
            <div>

                <div>
                    <label>Name: </label>
                    <input
                        type= "text"
                        value= {input.name}
                        name= 'name'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (<p className='error'>{errors.name}</p>)}
                </div>

                <div>
                    <label>Hp: </label>
                    <input
                        type= "number"
                        value= {input.hp}
                        name= 'hp'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.hp && (<p className='error'>{errors.hp}</p>)}
                </div>

                <div>
                    <label>Attack: </label>
                    <input
                        type= "number"
                        value= {input.attack}
                        name= 'attack'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.attack && (<p className='error'>{errors.attack}</p>)}
                </div>

                <div>
                    <label>Defense: </label>
                    <input
                        type= "number"
                        value= {input.defense}
                        name= 'defense'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.defense && (<p className='error'>{errors.defense}</p>)}
                </div>

                <div>
                    <label>Speed: </label>
                    <input
                        type= "number"
                        value= {input.speed}
                        name= 'speed'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.speed && (<p className='error'>{errors.speed}</p>)}
                </div>

                <div>
                    <label>Height: </label>
                    <input
                        type= "number"
                        value= {input.height}
                        name= 'height'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.height && (<p className='error'>{errors.height}</p>)}
                </div>

                <div>
                    <label>Weight: </label>
                    <input
                        type= "number"
                        value= {input.weight}
                        name= 'weight'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.weight && (<p className='error'>{errors.weight}</p>)}
                </div>

                <div>
                    <label>Image: </label>
                    <input
                        type= "text"
                        value= {input.image}
                        name= 'image'
                        onChange={(e) => handleChange(e)}
                    />
                    {errors.image && (<p className='error'>{errors.image}</p>)}
                </div>

                <div>
                    <h4>Types:</h4>
                <select onChange={(e) => handleSelect(e)}>
                    {pokeTypes.map((type) => (
                        <option value={type}>{type.replace(/\b\w/g, l => l.toUpperCase())}</option>
                    ))}
                </select>
                    <ul><div>{input.types.map(el => 
                        <div>
                            <p>{el.replace(/\b\w/g, l => l.toUpperCase())}</p>
                            {/* <button onClick={(el) => handleDelete(el)}>x</button> */}
                        </div>
                    )}</div></ul>
                </div>
            </div>
                <button type="submit">Crear Pokemon</button>
            </form>
        </div>
    )
}