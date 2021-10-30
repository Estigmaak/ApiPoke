import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../actions';
//import { getAttackPoke } from '../actions'
import { BsSearch } from 'react-icons/bs';

import style from './SearchBar.module.css';

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        dispatch(getNamePokemons(name))
        setName('');
    }

    //Buscar por puntos en ataque
    // function handleSubmit(e) {
    //     e.preventDefault(e);
    //     dispatch(getAttackPoke(name))
    //     setName('');
    // }

    return (
        <form
        className={style.space}
        onSubmit = {(e) => handleSubmit(e)}>
            <div>
                <input
                    className={style.searchBar}
                    type = 'text'
                    placeholder = 'Search Name...'
                    onChange = {(e) => handleInputChange(e)}
                    />
                <button
                className={style.button}
                type = 'submit'><BsSearch/></button>
            </div>
        </form>
    )
}