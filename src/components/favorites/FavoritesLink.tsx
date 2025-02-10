import { useGetFavoritesQuery } from "@/lib/slices/favoritesApiSlice";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

function FavoritesLink() {
  const favorites =
    useGetFavoritesQuery(undefined, { refetchOnMountOrArgChange: true }).data ||
    [];

  return (
    <Link
      href="/favorites"
      className="mb-2 relative flex justify-center items-center"
      data-testid="favorites-link"
    >
      <span className="invisible w-0 h-0 flex">Favoritos</span>
      <span
        role="counter"
        className="rounded-full bg-red-800 text-white text-xs w-5 h-5 flex items-center transform absolute top-1/2 left-1/2 justify-center -translate-x-1/2 -translate-y-1/2"
      >
        {favorites.length}
      </span>
      <FaHeart className="text-red-800 text-4xl mx-3" role="graphics-symbol" />
    </Link>
  );
}

FavoritesLink.displayName = Object.keys(FavoritesLink).join("");

export { FavoritesLink };
