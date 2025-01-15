import { favoriteState } from "@/jotai";
import { useAtom } from "jotai";

export const useFavoritesAction = () => {
  const [favorites, setFavorites] = useAtom(favoriteState);
  const handleFavorites = (item: any) => {
    if (!checkFavorites(item)) {
      addFavorites(favorites, item);
    }
  };

  const checkFavorites = (item: any) => {
    if (favorites.find((object: any) => object.id === item?.id)) {
      return true;
    }
    return false;
  };

  const addFavorites = (currentFavorites: any, item: any) => {
    const newData = [
      ...currentFavorites,
      {
        id: item.id,
        name: item.name,
        image: item.sprites.other.showdown.front_default,
      },
    ];
    setFavorites(newData);
  };

  const removeFavorites = (item: any) => {
    if (checkFavorites(item)) {
      const newList = favorites.filter((object: any) => object.id !== item.id);

      setFavorites(newList);
    }
  };

  return { handleFavorites, removeFavorites, checkFavorites };
};
