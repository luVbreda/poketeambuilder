import React, { useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

interface PokeSavedTeamProps {
  pokemons: Pokemon[];
}

const PokeSavedTeam: React.FC<PokeSavedTeamProps> = ({ pokemons }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const handlePokemonClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const closeModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <div>
      <div className="poke-team">
        {pokemons.slice(0, 6).map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon-card"
            onClick={() => handlePokemonClick(pokemon)}
          >
            <img src={pokemon.image} alt={pokemon.name} />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>

      {selectedPokemon && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <h2>{selectedPokemon.name}</h2>
            <img src={selectedPokemon.image} alt={selectedPokemon.name} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PokeSavedTeam;
