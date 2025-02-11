import { FavoritesList } from "@/components/favorites/FavoritesList";

export default function Favorites() {
  return (
    <main data-testid="favorites-page">
      <h1>Favoritos</h1>
      <FavoritesList />
    </main>
  );
}
