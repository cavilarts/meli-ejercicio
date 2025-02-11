"use client";

import { useToggleFavoriteMutation } from "@/lib/slices/favoritesApiSlice";
import { Item } from "@/types/item";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MouseEvent, useState } from "react";

export type FavoriteButtonProps = {
  item: Item & { favorite: boolean };
  updateFavorite?: (isFavorite: boolean) => void;
};

function FavoriteButton(props: FavoriteButtonProps) {
  const [setFavorite] = useToggleFavoriteMutation();
  const [favoriteState, setFavoriteState] = useState(props.item.favorite);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { favorite, ...item } = props.item;

    setFavorite(item);
    setFavoriteState(!favoriteState);
  };

  return (
    <button
      onClick={handleClick}
      className=" text-red-800 p-2 rounded-md text-2xl"
      data-testid="favorite-button"
    >
      <span className="w-0 h-0 invisible flex">
        {favoriteState ? "favorito" : "incluyelo a tus favoritos"}
      </span>
      {favoriteState ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
}

FavoriteButton.displayName = Object.keys(FavoriteButton).join("");

export { FavoriteButton };
