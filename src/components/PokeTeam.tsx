import { useState, useEffect } from "react";
import EeveePlaceholder from "../../public/klipartz.com.png";
import PokeCardTeam from "@/components/PokeCardTeam";
import { StaticImageData } from "next/image";
export default function PokeTeam(props: { bg_color: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    const loadTeam = async () => {
  try {
        setIsLoading(true);
        // Simula um tempo de carregamento para evitar flash
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Erro ao carregar o time'));
        setIsLoading(false);
      }
    };
    loadTeam();
  }, []);
  if (isLoading) {
    return <div className="animate-pulse">Carregando time...</div>;
  }
  if (error) {
    return <div className="text-red-500">Erro ao carregar o time: {error.message}</div>;
  }
  return (
    <ul className={`grid grid-cols-2 gap-4 rounded-2xl p-8 ${props.bg_color === "red" ? "bg-red-200" : "bg-blue-200"}`}>
        <PokeCardTeam poke_name="Eevee" poke_image={EeveePlaceholder as StaticImageData} />
      <li className="flex h-fit w-fit items-center justify-center rounded-xl bg-[#f1f1f1] p-4 cursor-pointer">
        <span className="text-4xl">+</span>
      </li>
        <PokeCardTeam poke_name="Eevee" poke_image={EeveePlaceholder as StaticImageData} />
      <li className="flex h-fit w-fit items-center justify-center rounded-xl bg-[#f1f1f1] p-4 cursor-pointer">
        <span className="text-4xl">+</span>
      </li>
        <PokeCardTeam poke_name="Eevee" poke_image={EeveePlaceholder as StaticImageData} />
      <li className="flex h-fit w-fit items-center justify-center rounded-xl bg-[#f1f1f1] p-4 cursor-pointer">
        <span className="text-4xl">+</span>
      </li>
    </ul>
  );
}
