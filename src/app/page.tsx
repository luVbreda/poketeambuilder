/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import eeveePng from "../../public/pokemon-eevee.png";
import pikachuPng from "../../public/pokemon-pikachu.png";
import teamBuilderText from "../../public/Pokemon-team-builder-text.png";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://pokedex-backend-woad.vercel.app/api/users/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        },
      );

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();
      // Store token and userId in localStorage
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      }
      console.log("Login successful:", data);
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#eeafaf]">
      {/* Left Pokémon Image */}
      <div className="absolute top-0 left-0 flex h-full w-1/4 items-center justify-center">
        <Image
          width={400}
          height={400}
          src={pikachuPng}
          alt="Pokemon Left"
          className="max-h-full object-contain"
        />
      </div>

      {/* Right Pokémon Image */}
      <div className="absolute top-0 right-0 flex h-full w-1/4 items-center justify-center">
        <Image
          width={400}
          height={400}
          src={eeveePng}
          alt="Pokemon Right"
          className="max-h-full object-contain"
        />
      </div>

      {/* Login Form */}
      <div className="z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <Image
          width={400}
          height={400}
          src={teamBuilderText}
          alt="Pokemon Team Builder"
        />
        <h1 className="mb-6 text-2xl font-bold text-gray-800">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 w-full rounded border p-2 shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full rounded border p-2 shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 flex justify-center">
          <a
            href="/register"
            className="w-full rounded bg-gray-200 px-4 py-2 text-center text-gray-800 transition-colors hover:bg-gray-300"
          >
            Register
          </a>
        </div>
      </div>
    </div>
  );
}
