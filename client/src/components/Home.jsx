import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes , filterPokemonsByTypes, filterPokemonsCreated, orderByName, orderByAttack, getPokemonDetail } from '../actions/index.js';
import { Link } from 'react-router-dom';
import Card from './Card';
import { Fragment } from 'react';
import Paginate from './Paginate';
import SearchBar from './SearchBar';

import style from './Home.module.css';

export default function Home(props) {

    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons) // me lo traigo del reducer el estado de allPokes...
    const pokeTypes = useSelector((state) => state.pokeTypes)
    const [orden, setOrden] = useState('');
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

    useEffect(() => {
        dispatch(getTypes())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getPokemons());
    }

    function handleFilterType(e){
        e.preventDefault();
        dispatch(filterPokemonsByTypes(e.target.value));
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterPokemonsCreated(e.target.value));
    }

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleOrderByAttack(e){
        e.preventDefault();
        dispatch(orderByAttack(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    return (
        <div className={style.body}>
            <Link to= '/pokemon'>
            <button className={style.button}>Create Pokemon</button></Link>
                
            <button 
            className={style.button}
            onClick={e => {handleClick(e)}}>Reload Pokemons</button>

            

            <div>
                <div>
                    <SearchBar/>
                </div>
                
                <div>
                    <label>Order by:</label>
                    <div className={style.selectCont}>
                        <select 
                        className={style.selectName}
                        onChange={e => handleOrderByName(e)}>
                            <option value='asc'>AZ⬇</option>
                            <option value='desc'>AZ⬆</option>
                        </select>

                        <select
                        className={style.selectAttack}
                        onChange={e => handleOrderByAttack(e)}>
                            <option value='asc'>Attack⬇</option>
                            <option value='desc'>Attack⬆</option>
                        </select>

                        <select 
                            className={style.selectType}
                            onChange={e => handleFilterType(e)}>
                            <option value='all'>All</option>
                            {pokeTypes.map((type) => (
                            <option value={type} key={type}>{type.replace(/\b\w/g, l => l.toUpperCase())}</option>
                            ))}
                        </select>

                        <select
                        className={style.selectCreated}
                        onChange={e => handleFilterCreated(e)}>
                            <option value='all'>All</option>
                            <option value='created'>Create</option>
                            <option value='api'>Existing</option>
                        </select>
                    </div>

                    <div className={style.gridContainer}>
                        {
                            currentPokes?.map(p => {
                                return (
                                    <Fragment key={p.id}>
                                        <Link to={'/home/' + p.id} key={p.id} onClick={(p) => getPokemonDetail(p.id)}>
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
            </div>
        </div>
    )
}