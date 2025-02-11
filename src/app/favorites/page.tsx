import { FavoritesList } from "@/components/favorites/FavoritesList";

export default function Favorites() {
  return (
    <main
      data-testid="favorites-page"
      className="bg-gray-100 h-screen w-screen"
    >
      <h1 className="text-3xl p-5">Favoritos</h1>
      <FavoritesList />
    </main>
  );
}
