"use client";

import { useDataQuery } from "@/hooks";
import { MainLayout } from "@/layouts";
import { map } from "lodash";

export const HomeViews = () => {
  const { data: pokemonList } = useDataQuery({
    url: "/generation/1",
    dependencies: ["GET_POKEMON_LIST"],
  });

  console.log(pokemonList?.pokemon_species);

  return (
    <MainLayout>
      <div className="flex-1">
        <div className="w-full h-full">
          <div className="text-center font-bold">Gen: </div>
          <div>Search</div>
          <div className="">
            {map(pokemonList?.pokemon_species, (pokemon) => (
              <div key={pokemon.name}>
                <div>{pokemon.name}</div>
              </div>
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </MainLayout>
  );
};
