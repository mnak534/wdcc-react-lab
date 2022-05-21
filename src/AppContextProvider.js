import React from 'react';
import { useState } from 'react';
import pokemons from './pokemon.json';
// import PokemonDetail from './PokemonDetail';

// Create a context object, can be used anywhere we need
// to access the context info in this provider.
export const AppContext = React.createContext({ list: [] });

export function AppContextProvider({ children }) {

    //initialise the pokemon array
    const initPokemon = pokemons[0];

    // Stateful todo list
    const [currentPokemon, setPokemon] = useState(initPokemon);

    function onPokemonClick(index) {
        setPokemon(pokemons[index]);
    }

    // All this info will be made available to any children of
    // this provider
    const context = {
        currentPokemon,
        onPokemonClick
    }

    return (
        <AppContext.Provider value={context}>
            {children}
        </AppContext.Provider>
    )
}