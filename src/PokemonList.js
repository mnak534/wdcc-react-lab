import pokemonList from'./pokemon.json';
import {AppContext} from './AppContextProvider'
import {useContext} from 'react';
import PokemonDetail from './PokemonDetail';

function PokemonList() {
    // const lists = [{id:"001", name: "Bulabsaur"}, 
    // {id:"002", name: "Ivysaur"},
    // {id: "003", name: "Venusaur"}]

    const {currentPokemon, onPokemonClick} = useContext(AppContext);

    return(
        <div>
            <PokemonDetail pokemon = {currentPokemon}/>
            <ul class = "menu">
                {pokemonList.map((pokemon, index) => (
                    <li key = {pokemon.id} onClick={() => onPokemonClick(index)}> No.{pokemon.id} : {pokemon.name} </li>
                    // <li key = {pokemon.id}> No.{pokemon.id} : {pokemon.name} </li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonList;