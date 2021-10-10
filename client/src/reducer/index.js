const initialState = {
    pokemons : [],
    allPokemons : [],
    pokeTypes : [],
};

function rootReducer (state= initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
            
        case 'GET_NAME_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
            }
        case 'GET_POKE_TYPE':
            return {
                ...state,
                pokeTypes: action.payload
            }

        case 'FILTER_BY_TYPE':
            const allPokemons = state.allPokemons
            const typesFiltered = action.payload === 'all' ?
            allPokemons :
            allPokemons.filter(e => e.types.name === action.payload)

            return {
                ...state,
                pokemons: typesFiltered,
            }

        case 'FILTER_CREATED':
            const allPokemons2 = state.allPokemons
            const createdFilter = action.payload === 'created' ? allPokemons2.filter(e => e.createdInBd) : allPokemons2.filter(e => !e.createdInBd)
            return {
                ...state,
                pokemons: action.payload === 'all' ? allPokemons2 : createdFilter
            }

        case 'POST_POKEMON':
            return {
                ...state,
            }

        case 'ORDER_BY_NAME':
            let arrSort = action.payload === 'asc' ?
            state.allPokemons.sort(function (a, b) {
                if(a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) : //'desc'
            state.allPokemons.sort(function (a, b) {
                if(a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                pokemons: arrSort
            }
        default:
            return state;
    }

}

export default rootReducer;