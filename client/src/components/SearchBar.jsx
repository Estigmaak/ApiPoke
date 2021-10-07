import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNamePokemons } from '../actions';

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
    }

    return (
        <div>
            <input
                type = 'text'
                placeholder = 'Search Name...'
                onChange = {handleInputChange(e)}
            />
            <button type = 'submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}