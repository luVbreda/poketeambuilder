/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import SavedPokeTeamSlot from "@/components/SavedPokeTeamSlot";

export default function TeamPage() {
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      window.location.href = "/";
      return;
    }

    const fetchTeams = async () => {
      try {
        const response = await fetch(
          `https://pokedex-backend-woad.vercel.app/api/poketeams/user/${userId}`,
        );
        if (response.ok) {
          const data = await response.json();
          const formattedTeams = Array.isArray(data)
            ? data.map((teamObj: any) => ({
                teamId: teamObj._id || teamObj.teamId, // Ensure teamId is present
                teamName: teamObj.teamName || "",
                pokemonNames: teamObj.pokemonNames || [],
              }))
            : [];
          setTeams(formattedTeams);
        } else {
          const errorText = await response.text();
          console.error("Failed to fetch teams:", errorText);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
    fetchTeams();
  }, []);

  const handleDeleteTeam = async (teamId: string) => {
    console.log("Deleting team with ID:", teamId);
    if (!teamId) return;
    try {
      const response = await fetch(
        `https://pokedex-backend-woad.vercel.app/api/poketeams/${teamId}`,
        {
          method: "DELETE",
        },
      );
      if (response.ok) {
        setTeams((prev) => prev.filter((team) => team.teamId !== teamId));
      } else {
        const errorText = await response.text();
        console.error("Failed to delete team:", errorText);
      }
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  return (
    <div className="max-h-max min-h-screen w-screen bg-gray-50 font-sans">
      <header className="bg-gradient-to-r from-red-500 to-red-700 p-6 shadow-md">
        <div className="flex items-center justify-between">
          <h1
            className="cursor-pointer text-3xl font-bold text-white"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Pokémon Teams
          </h1>
        </div>
      </header>

      <main className="px-4 py-8 md:px-16">
        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Teams</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {teams.map((team, teamIndex) => (
              <div
                key={team.teamId || teamIndex}
                className="rounded-lg bg-white p-4 shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {team.teamName || `Team ${teamIndex + 1}`}
                  </h3>
                  <button
                    className="ml-2 rounded bg-red-500 px-3 py-1 text-sm font-semibold text-white hover:bg-red-700"
                    onClick={() => handleDeleteTeam(team.teamId)}
                  >
                    Delete
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {team.pokemonNames.map(
                    (pokemonName: string, slotIndex: number) =>
                      pokemonName ? (
                        <SavedPokeTeamSlot key={slotIndex} name={pokemonName} />
                      ) : (
                        <div key={slotIndex} />
                      ),
                  )}
                </div>
              </div>
            ))}
            {teams.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                No teams available.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
