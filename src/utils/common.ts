export const handleFavorites = (item: any) => {
  const currentFavorites = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  if (!checkFavorites(item)) {
    addFavorites(currentFavorites, item);
  }
};

export const checkFavorites = (item: any) => {
  const currentFavorites = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  if (currentFavorites.find((object: any) => object.id === item?.id)) {
    return true;
  }
  return false;
};

export const addFavorites = (currentFavorites: any, item: any) => {
  const newData = JSON.stringify([
    ...currentFavorites,
    {
      id: item.id,
      name: item.name,
      image: item.sprites.other.showdown.front_default,
    },
  ]);
  localStorage.setItem("favorites", newData);
};

export const removeFavorites = (item: any) => {
  const currentFavorites = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  if (checkFavorites(item)) {
    const newList = currentFavorites.filter(
      (object: any) => object.id !== item.id
    );
    localStorage.setItem("favorites", JSON.stringify(newList));
  }
};
