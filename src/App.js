import PokemonDetail from './PokemonDetail';
import PokemonList from './PokemonList';
import React from 'react';
import {AppContext} from './AppContextProvider'
import {useContext} from 'react';

function App() {

  /*Need to set the curerntPokemon passed from the ppokemonList */
  const {pokemonList, onPokemonClick} = useContext(AppContext);

  return (
    <div>
      <React.Fragment>
        <h1>Pokédex</h1>
        <PokemonList/>
        
        {/* <PokemonList/>
        {pokemonList.map((mon) => (<PokemonDetail pokemon = {mon}/>
        ))} */}
        {/* <PokemonDetail pokemon = {currentPokemon}/> */}
      </React.Fragment>
    </div>
  );
}

export default App;