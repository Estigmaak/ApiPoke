import axios from 'axios';

export function getPokemons(){
    return async function(dispatch) {
        var json = await axios(`/pokemons`,{});
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function getNamePokemons(name) {
    return async function(dispatch) {
        try {
            var json = await axios(`/pokemons?name=` + name)
            return dispatch({
                type: 'GET_NAME_POKEMONS',
                payload: json.data
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export function getTypes() {
    return async function(dispatch) {
        var json = await axios(`/types`, {});
        return dispatch({
            type: 'GET_POKE_TYPE',
            payload: json.data
        })
    }
}

export function postPokemon(payload) {
    return async function(dispatch) {
        const body = await axios.post(`/pokemon`, payload);
        return body;
    }
}

export function filterPokemonsByTypes(payload) {
    return {
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterPokemonsCreated(payload) {
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByAttack(payload) {
    return {
        type: 'ORDER_BY_ATTACK',
        payload
    }
}

export function getPokemonDetail(id) {
    return async function(dispatch) {
        try {
            var json = await axios(`/pokemons/` + id)
            return dispatch({
                type: 'GET_POKEMON_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// export function getAttackPoke(payload) {
//     return {
//         type: 'GET_ATTACK_POKE',
//         payload
//     }
// }