"use client";

import { useDataQuery } from "@/hooks";
import { MainLayout } from "@/layouts";
import { POKEMON_TYPE } from "@/utils";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { map } from "lodash";
import Link from "next/link";

type Props = {
  id: string;
};

export const DetailViews: React.FC<Props> = ({ id }) => {
  const { data: PokemonMeta } = useDataQuery({
    url: `/pokemon/${id}`,
    dependencies: ["GET_POKEMON_META", id],
  });

  const pokemonTypesList = map(PokemonMeta?.types, (pkm) =>
    POKEMON_TYPE.find(
      (type: any) => type.name.toLowerCase() === pkm.type.name.toLowerCase()
    )
  );

  const { data: PokemonSpecies } = useDataQuery({
    url: `/pokemon-species/${id}`,
    dependencies: ["GET_POKEMON_SPECIES", id],
  });

  const { data: PokemonEvoChains } = useDataQuery({
    url: `${PokemonSpecies?.evolution_chain?.url}`,
    dependencies: ["GET_POKEMON_EVOLUTION_CHAINS", id],
    enabled: !!PokemonSpecies,
  });

  const firstFormName = PokemonEvoChains?.chain?.species?.name;
  const secondFormName = PokemonEvoChains?.chain?.evolves_to[0]?.species?.name;
  const thirdFormName =
    PokemonEvoChains?.chain?.evolves_to[0]?.evolves_to[0]?.species?.name;

  const { data: firstForm } = useDataQuery({
    url: `/pokemon/${firstFormName}`,
    dependencies: ["GET_POKEMON_FIRST_FORM", firstFormName],
  });

  const { data: secondForm } = useDataQuery({
    url: `/pokemon/${secondFormName}`,
    dependencies: ["GET_POKEMON_SECOND_FORM", secondFormName],
  });

  const { data: thirdForm } = useDataQuery({
    url: `/pokemon/${thirdFormName}`,
    dependencies: ["GET_POKEMON_THIRD_FORM", thirdFormName],
  });

  console.log("1st", firstForm);
  console.log("2nd", secondForm);
  console.log("3rd", thirdForm);

  return (
    <MainLayout>
      <div className="w-full flex flex-col items-center ">
        <img
          className="w-32 h-32 mb-3"
          src={`${PokemonMeta?.sprites?.other?.showdown?.front_default}`}
        />

        <div className="capitalize text-center text-3xl font-semibold">
          {PokemonMeta?.name}
        </div>
        <div className="flex gap-3 mt-3">
          {map(pokemonTypesList, (pokemonType) => (
            <div
              key={pokemonType?.name}
              className="rounded text-white "
              style={{ backgroundColor: `${pokemonType?.color}` }}
            >
              <div className="uppercase px-2">{pokemonType?.name}</div>
            </div>
          ))}
        </div>

        <h1 className="text-2xl mt-6 mb-3 font-bold bg-yellow-300 rounded-lg shadow-sm px-2 ">
          Evolution Chains
        </h1>

        <div className="flex gap-16 max-[576px]:flex-col max-[576px]:gap-3">
          {/* First Form */}
          <>
            <div>
              <div className="font-semibold">{"(1st Form)"}</div>
              <Link href={`/detail/${firstForm?.id}`}>
                {firstForm?.sprites?.other?.showdown?.front_default ? (
                  <img
                    className="w-20 h-20 mb-3"
                    src={`${firstForm?.sprites?.other?.showdown?.front_default}`}
                  />
                ) : (
                  <Skeleton.Image active />
                )}

                <div className="capitalize text-center font-semibold">
                  {firstForm?.name}
                </div>
              </Link>
            </div>
          </>

          {/* Second Form */}
          {secondForm && (
            <>
              <ArrowRightOutlined className="max-[576px]:rotate-90 max-[576px]:self-center" />
              <Link href={`/detail/${secondForm?.id}`}>
                <div className="font-semibold">{"(2nd Form)"}</div>
                {secondForm?.sprites?.other?.showdown?.front_default ? (
                  <img
                    className="w-20 h-20 mb-3"
                    src={`${secondForm?.sprites?.other?.showdown?.front_default}`}
                  />
                ) : (
                  <Skeleton.Image active />
                )}

                <div className="capitalize text-center font-semibold">
                  {secondForm?.name}
                </div>
              </Link>
            </>
          )}

          {/* Third Form */}
          {thirdForm && (
            <>
              <ArrowRightOutlined className="max-[576px]:rotate-90 max-[576px]:self-center" />
              <Link href={`/detail/${thirdForm?.id}`}>
                <div className="font-semibold">{"(3rd Form)"}</div>
                {thirdForm?.sprites?.other?.showdown?.front_default ? (
                  <img
                    className="w-20 h-20 mb-3"
                    src={`${thirdForm?.sprites?.other?.showdown?.front_default}`}
                  />
                ) : (
                  <Skeleton.Image active />
                )}
                <div className="capitalize text-center  font-semibold">
                  {thirdForm?.name}
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};
