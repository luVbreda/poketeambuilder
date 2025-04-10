/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  const data = await response.json();

  const pokemonList = await Promise.all(
    data.results.map(async (pokemon: any) => {
      const pokemonDetails = await fetch(pokemon.url).then((res) => res.json());
      return {
        id: pokemonDetails.id,
        name: pokemon.name,
        sprite: pokemonDetails.sprites.front_default,
        types: pokemonDetails.types.map((t: any) => t.type.name),
      };
    }),
  );
  return pokemonList;
}

export const fetchPokemonSpecies = async (id: number) => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
  );
  if (!response.ok) {
    throw new Error("Erro ao buscar a espécie do Pokémon");
  }
  const data = await response.json();
  console.log(data);
  return data;
};

export async function fetchTypeAdvantages(types: string[]): Promise<any> {
  if (types.length === 0) {
    return { strongAgainst: [], weakAgainst: [] };
  }

  const typeChart: Record<
    string,
    { double_damage_from: string[]; double_damage_to: string[] }
  > = {};

  // Busca os dados de cada tipo na PokeAPI
  for (const type of types) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar dados do tipo ${type}`);
    }
    const data = await response.json();
    typeChart[type] = {
      double_damage_from: data.damage_relations.double_damage_from.map(
        (t: any) => t.name,
      ),
      double_damage_to: data.damage_relations.double_damage_to.map(
        (t: any) => t.name,
      ),
    };
  }

  const advantages = {
    strongAgainst: new Set<string>(),
    weakAgainst: new Set<string>(),
  };

  // Calcula vantagens e desvantagens
  Object.values(typeChart).forEach((relations) => {
    relations.double_damage_to.forEach((adv) =>
      advantages.strongAgainst.add(adv),
    );
    relations.double_damage_from.forEach((disadv) =>
      advantages.weakAgainst.add(disadv),
    );
  });

  return {
    strongAgainst: Array.from(advantages.strongAgainst),
    weakAgainst: Array.from(advantages.weakAgainst),
  };
}
