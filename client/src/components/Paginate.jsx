import React from 'react';

import style from './Paginate.module.css';

export default function Paginate({pokemonsPerPage, allPokemons, paginate}) {
    const pageNumbers = []
    // vamos a recorrer un array en el que voy a tomar un numero que resulta de dividir todos los pokes por los pokes por pagina que quiero
    for (let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={style.ul}>
                {pageNumbers && pageNumbers.map(num => (
                    <li className={style.button} key={num}>
                        <a onClick={() => paginate(num)}>{num}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}