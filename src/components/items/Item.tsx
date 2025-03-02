import type { Item as ItemType } from "@/types/item";
import Image from "next/image";
import Link from "next/link";
import { FavoriteButton } from "../favorites/FavoriteButton";
import { useGetFavoritesQuery } from "@/lib/slices/favoritesApiSlice";

export type ItemProps = {
  item: ItemType;
};

function Item({ item }: ItemProps) {
  const favorites =
    useGetFavoritesQuery(undefined, {
      refetchOnMountOrArgChange: true,
    }) ?? [];
  const isFavorite = favorites.data?.some(
    (favorite) => favorite.id === item.id
  );

  const formatPrice = (price: number) => {
    return price.toLocaleString("es-AR", {
      style: "currency",
      currency: item.price.currency,
      minimumFractionDigits: item.price.decimals,
      maximumFractionDigits: item.price.decimals,
    });
  };

  return (
    <Link
      href={`/items/${item.id}`}
      passHref
      className="flex flex-col mx-auto w-full rounded-lg overflow-hidden"
    >
      <article
        className="flex bg-white p-4 gap-4 md:w-[1280px]"
        data-testid="item"
        data-item-id={item.id}
      >
        <Image
          src={item.picture}
          alt={`Imagen de ${item.title}`}
          width="180"
          height="180"
          className="rounded-sm w-36 h-36"
        />
        <div className="flex justify-between w-full">
          <div>
            <div className="flex gap-2 mb-4">
              <h2 className="text-2xl">{formatPrice(item.price.amount)}</h2>
              <Image
                src="/images/ic_shipping.png"
                alt="Free shipping"
                width="24"
                height="24"
                className="self-center w-6 h-6"
              />
            </div>
            <h3>{item.title}</h3>
          </div>
          <FavoriteButton item={{ ...item, favorite: !!isFavorite }} />
        </div>
      </article>
      <div className="border-solid border-b-[1px] px-4" />
    </Link>
  );
}

Item.displayName = Object.keys(Item).join("");

export { Item };
