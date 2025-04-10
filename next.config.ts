import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pokeapi.co",
        pathname: "/media/sprites/**", // Para sprites do PokeAPI
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**", // Para sprites do GitHub
      },
    ],
  },
};

export default nextConfig;

