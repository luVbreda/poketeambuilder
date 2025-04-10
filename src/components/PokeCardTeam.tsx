import Image, { StaticImageData } from "next/image";
import { useState } from "react";
export default function PokeCardTeam(props: {
  poke_name: string;
  poke_image: string | StaticImageData;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <li className="flex h-fit w-fit rounded-xl bg-[#f1f1f1] p-4">
      <div className={`relative w-16 ${!imageLoaded ? 'animate-pulse bg-gray-200' : ''}`}>
        <Image 
          alt="pokemon image" 
          src={props.poke_image} 
          className="w-16"
          onLoad={() => setImageLoaded(true)}
          priority
        />
      </div>
      <div>
        <p>{props.poke_name}</p>
        <p>Type</p>
      </div>
    </li>
  );
}
