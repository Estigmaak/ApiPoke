import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail } from '../actions'
import { useEffect } from 'react';

import style from './Detail.module.css';

export default function PokemonDetail(props) {
    // console.log(props)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemonDetail(props.match.params.id))
    }, [dispatch])

    const myPokemon = useSelector((state) => state.detail)

    return(
        <div className={style.body}>
            <div>
                <Link to='/home'>
                    <button
                        className={style.button}>Home</button>
                </Link>
            </div>
            <div className={style.card}>
            {
                myPokemon.length > 0 ?
                <div>
                    {/* // name, hp, attack, defense, speed, height, weight, image, types */}
                    <h2 className={style.name}>{myPokemon[0].name.replace(/\b\w/g, l => l.toUpperCase())}</h2>
                    <img src={myPokemon[0].image} alt='' width='200px' height='250px'/>
                    <h3 className={style.stat}>Stats</h3>
                    <p className={style.p}>Hp: {myPokemon[0].hp}</p>
                    <p className={style.p}>Attack: {myPokemon[0].attack}</p>
                    <p className={style.p}>Defense: {myPokemon[0].defense}</p>
                    <p className={style.p}>Speed: {myPokemon[0].speed}</p>
                    <p className={style.p}>Heigt: {myPokemon[0].height}</p>
                    <p className={style.p}>Weigt: {myPokemon[0].weight}</p>
                    <p className={style.p}>Types:{myPokemon[0].types.map(e => (' ') + e.name.replace(/\b\w/g, l => l.toUpperCase()))}</p>
                </div>
                :
                <p>Loading...</p>
            }
            </div>
        </div>
    )
}