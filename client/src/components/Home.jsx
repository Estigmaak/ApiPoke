import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, filterPokemonsByTypes, filterPokemonsCreated, orderByName } from '../actions/index.js';
import { Link } from 'react-router-dom';
import Card from './Card';
import { Fragment } from 'react';
import Paginate from './Paginate';

export default function Home() {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons) // me lo traigo del reducer el estado de allPokes...
    const [currentPage, setCurrentPage] = useState(1); // Pagina actual / local
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12); // Pokes por pagina / local
    const indexLastPoke = currentPage * pokemonsPerPage; // 12
    const indexFirstPoke = indexLastPoke - pokemonsPerPage; // 0
    const currentPokes = allPokemons.slice(indexFirstPoke, indexLastPoke);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //ComponentDidMount
    useEffect(() => {
        dispatch(getPokemons())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterType(e){
        dispatch(filterPokemonsByTypes(e.target.value));
    }

    function handleFilterCreated(e){
        dispatch(filterPokemonsCreated(e.target.value));
    }

    function handleOrderByName(e){
        dispatch(orderByName(e.target.value));
    }

    return (
        <div>
            <Link to= '/pokemon'>Crear Pokemon</Link>
            <h1>Home</h1>
            <button onClick={e => {handleClick(e)}}>Recargar Pokemons</button>
            
            <div>
                <select onChange={e => handleOrderByName(e)}>
                    <option value='asc'>Ascendente</option>
                    <option value='desc'>Descendente</option>
                </select>

                <select onChange={e => handleFilterType(e)}>
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

                <select onChange={e => handleFilterCreated(e)}>
                    <option value='all'>Todos</option>
                    <option value='created'>Creados</option>
                    <option value='api'>Existentes</option>
                </select>


                {
                    currentPokes?.map(p => {
                        return (
                            <Fragment>
                                <Link to={'/home/' + p.id} key={p.id}>
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
                                                    <h5 key={e.name}>{e.name.replace(/\b\w/g, l => l.toUpperCase())}</h5>
                                                )})}
                                        />
                                </Link>
                            </Fragment>
                        );
                    })
                }
            </div>

            <Paginate
            pokemonsPerPage = {pokemonsPerPage}
            allPokemons = {allPokemons.length}
            paginate = {paginate}
            />

        </div>
    )
}