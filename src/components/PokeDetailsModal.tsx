import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import PokeType from "./aux components/type";
import CloseIcon from "../../public/material-symbols--close-rounded.svg";

export default function PokeDetailsModal(props: {
  poke_name: string;
  poke_number: number;
  poke_image: string;
  show_modal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  handleAddPokemon: (pokemonName: string) => void;
  poke_types: Array<string>;
  poke_desc: string;
}) {
  console.log("POKEIMAGE " + props.poke_image);
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        props.show_modal ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="relative flex h-3/4 w-96 flex-col items-center justify-center rounded-xl bg-[url('/pokedex-modal-mobile.png')] bg-cover bg-center bg-no-repeat p-4 md:h-1/2 md:w-[64rem] md:flex-row md:bg-[url('/pokedex-modal.png')]">
        <button
          className="absolute top-20 right-8 md:top-4 md:right-56"
          onClick={() => props.setOpenModal(false)}
        >
          <Image alt="close icon" src={CloseIcon} className="w-10" />
        </button>

        <div className="flex w-full flex-col items-center justify-center gap-8 md:flex-row">
          <Image
            src={props.poke_image}
            alt="pokemon image"
            className="w-48 md:w-64 object-contain" // Adicionado object-contain para corrigir a proporção da imagem
            width={96}
            height={96}
          />
          <div className="flex flex-col items-center justify-start gap-4 md:items-start">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-2xl font-bold uppercase">
                <span>#{props.poke_number} </span>
                {props.poke_name}
              </h2>
              <ul className="flex gap-2">
                {props.poke_types.map((type, index) => (
                  <PokeType key={index} type={type} />
                ))}
              </ul>
            </div>
            {/* Exibir a descrição dinâmica */}
            <p className="text-justify">{props.poke_desc}</p>
            <button
              className="rounded-3xl border-1 border-black bg-red-50 p-2"
              onClick={() => {
                props.handleAddPokemon(props.poke_name);
                props.setOpenModal(false);
              }}
            >
              Add to team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
