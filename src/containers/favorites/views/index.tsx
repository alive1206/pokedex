"use client";

import { useFavoritesAction } from "@/hooks";
import { favoriteState } from "@/jotai";
import { MainLayout } from "@/layouts";
import { HeartFilled } from "@ant-design/icons";
import { Divider, Empty } from "antd";
import { useAtomValue } from "jotai";
import { map } from "lodash";
import { useRouter } from "next/navigation";

export const FavoritesViews = () => {
  const pokemons = useAtomValue(favoriteState);
  const router = useRouter();
  const { removeFavorites } = useFavoritesAction();

  return (
    <MainLayout>
      {pokemons.length > 0 ? (
        <div className="grid grid-cols-5 gap-16 pb-3 max-[1200px]:grid-cols-4 max-[992px]:grid-cols-3 max-sm:grid-cols-2 max-[576px]:grid-cols-1">
          {map(pokemons, (pokemon) => (
            <div
              className="border w-full h-full flex flex-col items-center rounded-lg shadow-md relative py-10 overflow-hidden cursor-pointer group"
              key={pokemon?.id}
            >
              <img
                className="w-20 h-20 mb-2 pt-4 group-hover:scale-150 transition-transform duration-200"
                src={`${pokemon?.image}`}
                onClick={() => router.push(`/detail/${pokemon?.id}`)}
              />
              <Divider />
              <div className="capitalize font-semibold">{pokemon?.name}</div>
              <div className="border rounded-[50%] absolute z-10 hover:scale-125 transition-transform duration-200 right-0 bottom-16 shadow-md bg-white">
                <HeartFilled
                  className="p-4 text-red-500"
                  onClick={() => removeFavorites(pokemon)}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="You have not added any favorite pokemon yet!"
        />
      )}
    </MainLayout>
  );
};
