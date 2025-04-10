/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import PokeType from "@/components/aux components/type";

export default function PokeTeamSlot({
  pokemonName,
  onAdd,
  onRemove,
  pokemonList,
}: {
  pokemonName: string | null;
  onAdd: () => void;
  onRemove: () => void;
  pokemonList: any[];
}) {
  const pokemonData = pokemonList.find((p) => p.name === pokemonName);

  return (
    <div
      className={`relative flex h-24 w-24 items-center justify-center rounded border ${
        pokemonName ? "bg-gray-100" : "bg-gray-300"
      }`}
    >
      {pokemonName && pokemonData ? (
        <div className="flex flex-col items-center">
          <Image
            src={pokemonData.sprite}
            alt={pokemonName}
            width={64}
            height={64}
            className="h-16 w-16"
          />
          <span className="mt-2 text-sm capitalize">{pokemonName}</span>
          <ul className="flex gap-1">
            {pokemonData.types?.map((type: string) => (
              <PokeType key={type} type={type} />
            ))}
          </ul>
        </div>
      ) : (
        <button className="text-2xl font-bold text-gray-500" onClick={onAdd}>
          +
        </button>
      )}
      {pokemonName && (
        <button
          className="absolute top-1 right-1 h-6 w-6 rounded-full bg-red-500 text-white"
          onClick={onRemove}
        >
          x
        </button>
      )}
    </div>
  );
}
