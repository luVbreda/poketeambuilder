import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import PokeType from "./aux components/type";

async function fetchPokemonList() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
  if (!response.ok) {
    throw new Error("Erro ao buscar a lista de Pokémon");
  }
  const data = await response.json();
  return data.results;
}

export default function PokeCardSearch(props: {
  poke_name: string;
  poke_image: string;
  poke_types: Array<string>;
  poke_number: number;
  poke_desc: string;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setModalTypeArray: Dispatch<SetStateAction<string[]>>;
  setModalPokeName: Dispatch<SetStateAction<string>>;
  setmodalPokeNumber: Dispatch<SetStateAction<number>>;
  setModalPokeDesc: Dispatch<SetStateAction<string>>;
  setModalPokeImage: Dispatch<SetStateAction<string>>;
}) {
  useEffect(() => {
    const loadPokemonList = async () => {
      try {
        const list = await fetchPokemonList();
        console.log(list); // Apenas log para depuração
      } catch (error) {
        console.error("Erro ao carregar a lista de Pokémon:", error);
      }
    };
    loadPokemonList();
  }, []);

  return (
    <li
      className="flex h-fit w-full cursor-pointer rounded-xl bg-[#f1f1f1] p-4"
      onClick={() => {
        props.setOpenModal(true);
        props.setModalPokeName(props.poke_name);
        props.setModalTypeArray(props.poke_types);
        props.setmodalPokeNumber(props.poke_number);
        props.setModalPokeDesc(props.poke_desc);
        props.setModalPokeImage(props.poke_image);
      }}
    >
      <Image
        alt="pokemon image"
        src={props.poke_image && props.poke_image.trim() !== "" ? props.poke_image : "/placeholder.png"}
        className="h-20 w-20" // Aumentei o tamanho da imagem
        width={140}
        height={140}
      />
      <div>
        <p className="uppercase">
          <span>#{props.poke_number} </span>
          {props.poke_name}
        </p>

        <ul className="flex flex-col gap-2">
          {props.poke_types.map((type, index) => (
            <PokeType key={index} type={type} />
          ))}
        </ul>
      </div>
    </li>
  );
}
