"use client";

import { useGetFavoritesQuery } from "@/lib/slices/favoritesApiSlice";
import { Item } from "../items/Item";
import { Spinner } from "../spinner/Spinner";

function FavoritesList() {
  const { data: favorites, isFetching } = useGetFavoritesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <section
      data-testid="favorites-list"
      className="grid grid-cols-1 md:max-w-7xl md:mx-auto"
    >
      {isFetching && <Spinner />}
      {!isFetching && favorites?.length === 0 && (
        <p className="p-4">No hay favoritos</p>
      )}
      {favorites?.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </section>
  );
}

FavoritesList.displayName = Object.keys(FavoritesList).join("");

export { FavoritesList };
