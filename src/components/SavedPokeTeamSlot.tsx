import { useEffect, useState } from "react";
import Image from "next/image";

interface SavedPokeTeamSlotProps {
  name: string;
}

interface PokemonData {
  sprites: {
    front_default: string;
  };
}

const SavedPokeTeamSlot: React.FC<SavedPokeTeamSlotProps> = ({ name }) => {
  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pokémon not found");
        return res.json();
      })
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pokemon) return null;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 16,
        width: 150,
        textAlign: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
    >
      <Image
        src={pokemon.sprites.front_default}
        alt={name}
        width={64}
        height={64}
        style={{ borderRadius: 8, marginBottom: 8 }}
      />
      <div
        style={{
          marginTop: 8,
          fontWeight: "bold",
          textTransform: "capitalize",
        }}
      >
        {name}
      </div>
    </div>
  );
};

export default SavedPokeTeamSlot;
