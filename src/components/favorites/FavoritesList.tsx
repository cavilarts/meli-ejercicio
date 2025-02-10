"use client";

import { useGetFavoritesQuery } from "@/lib/slices/favoritesApiSlice";
import { Item } from "../items/Item";

function FavoritesList() {
  const favorites =
    useGetFavoritesQuery(undefined, { refetchOnMountOrArgChange: true }).data ||
    [];
  return (
    <section>
      {favorites.length === 0 && <p>No hay favoritos</p>}
      {favorites.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </section>
  );
}

FavoritesList.displayName = Object.keys(FavoritesList).join("");

export { FavoritesList };
