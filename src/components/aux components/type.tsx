const getBgColor = (type: string) => {
  switch (type) {
    case "water":
      return "bg-blue-500 border-blue-800";
    case "fire":
      return "bg-[#E62829] border-[#961A1B]";
    case "grass":
      return "bg-green-500 border-green-800";
    case "flying":
      return "bg-[#81B9EF] border-[#54789B]";
    case "normal":
      return "bg-gray-400 border-gray-600"; // Cinza
    case "poison":
      return "bg-purple-600 border-purple-800"; // Roxo
    case "bug":
      return "bg-green-700 border-green-900"; // Verde Musgo
    case "fighting":
      return "bg-orange-600 border-orange-800"; // Laranja
    case "psychic":
      return "bg-purple-300 border-purple-500"; // Lilás
    case "ice":
      return "bg-blue-200 border-blue-400"; // Azul Claro
    case "electric":
      return "bg-yellow-400 border-yellow-600"; // Amarelo
    case "ground":
      return "bg-orange-800 border-orange-900"; // Laranja Escuro
    case "steel":
      return "bg-gray-500 border-gray-700"; // Azul Acinzentado
    case "dark":
      return "bg-gray-700 border-gray-800"; // Cinza Escuro (mais claro que antes)
    case "rock":
      return "bg-orange-400 border-orange-600"; // Laranja Claro
    case "ghost":
      return "bg-purple-800 border-purple-900"; // Lilás Escuro
    case "dragon":
      return "bg-blue-900 border-blue-950"; // Azul Escuro
    case "fairy":
      return "bg-pink-300 border-pink-500"; // Rosa
    default:
      return "bg-none border-none";
  }
};

export default function PokeType(props: { type: string }) {
  return (
    <li
      className={`${getBgColor(
        props.type
      )} flex w-16 items-center justify-center rounded-4xl border-2 text-xs uppercase`}
    >
      <p>{props.type}</p>
    </li>
  );
}
