import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons } from '../actions/index.js';
import { Link } from 'react-router-dom';
import Card from './Card';
import { Fragment } from 'react';

export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)

    //ComponentDidMount
    useEffect(() => {
        dispatch(getPokemons())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    return (
        <div>
            <Link to= '/pokemon'>Crear Pokemon</Link>
            <h1>Home</h1>
            <button onClick={e => {handleClick(e)}}>Recargar Pokemons</button>
            
            <div>
                <select>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>

                <select>
                    <option value='all'>Todos</option>
                    <option value='normal'>Normal</option>
                    <option value='fighting'>Fighting</option>
                    <option value='flying'>Flying</option>
                    <option value='poison'>Poison</option>
                    <option value='steel'>Steel</option>
                    <option value='ground'>Ground</option>
                    <option value='rock'>Rock</option>
                    <option value='bug'>Bug</option>
                    <option value='fire'>Fire</option>
                    <option value='ghost'>Ghost</option>
                    <option value='water'>Water</option>
                    <option value='grass'>Grass</option>
                    <option value='electric'>Electric</option>
                    <option value='psychic'>Psychic</option>
                    <option value='ice'>Ice</option>
                    <option value='dragon'>Dragon</option>
                    <option value='dark'>Dark</option>
                    <option value='fairy'>Fairy</option>
                    <option value='unknown'>Unknown</option>
                    <option value='shadow'>Shadow</option>
                </select>

                <select>
                    <option value='all'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existentes</option>
                </select>

                {
                    allPokemons?.map(p => {
                        return (
                            <Fragment>
                                <Link to={'/home/' + p.id}>
                                    <Card 
                                        name= {p.name}
                                        hp= {p.hp}
                                        attack= {p.attack}
                                        defense= {p.defense}
                                        speed= {p.speed}
                                        height= {p.height}
                                        weight= {p.weight}
                                        image= {p.image}
                                        types= {p.types.map(e => {
                                                return (
                                                    <h5>{e.name.replace(/\b\w/g, l => l.toUpperCase())}</h5>
                                                )})}
                                        />
                                </Link>
                            </Fragment>
                        );
                    })
                }
            </div>
        </div>
    )
}