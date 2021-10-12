import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail } from '../actions'
import { useEffect } from 'react';

export default function PokemonDetail(props) {
    console.log(props)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemonDetail(props.match.params.id))
    }, [dispatch])

    const myPokemon = useSelector((state) => state.detail)

    return(
        <div>
            <div>
                <Link to='/home'>
                    <button>Home</button>
                </Link>
            </div>
            {
                myPokemon.length > 0 ?
                <div>
                    {/* // name, hp, attack, defense, speed, height, weight, image, types */}
                    <h3>{myPokemon[0].name}</h3>
                    <img src={myPokemon[0].image}></img>
                    <h2>Stats</h2>
                    <p>Hp: {myPokemon[0].hp}</p>
                    <p>Attack: {myPokemon[0].attack}</p>
                    <p>Defense: {myPokemon[0].defense}</p>
                    <p>Speed: {myPokemon[0].speed}</p>
                    <p>Heigt: {myPokemon[0].height}</p>
                    <p>Weigt: {myPokemon[0].weight}</p>
                    <p>Types: {myPokemon[0].types.length > 1 ? myPokemon[0].types[0] + ', ' + myPokemon[0].types[1] : myPokemon[0].types[0]}</p>
                </div>
                :
                <p>Loading...</p>
            }
        </div>
    )
}