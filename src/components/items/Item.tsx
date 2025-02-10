import type { Item as ItemType } from "@/types/item";
import Image from "next/image";
import Link from "next/link";

export type ItemProps = {
  item: ItemType;
};

function Item({ item }: ItemProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("es-AR", {
      style: "currency",
      currency: item.price.currency,
      minimumFractionDigits: item.price.decimals,
      maximumFractionDigits: item.price.decimals,
    });
  };

  return (
    <Link href={`/items/${item.id}`} passHref>
      <article
        className="flex bg-white p-4 gap-4"
        data-testid="item"
        data-item-id={item.id}
      >
        <Image
          src={item.picture}
          alt={item.title}
          width="180"
          height="180"
          className="rounded-sm w-36 h-36"
        />
        <div>
          <div className="flex gap-2 mb-4">
            <p className="text-2xl">{formatPrice(item.price.amount)}</p>
            <Image
              src="/images/ic_shipping.png"
              alt="Free shipping"
              width="24"
              height="24"
              className="self-center w-6 h-6"
            />
          </div>
          <h2>{item.title}</h2>
        </div>
      </article>
    </Link>
  );
}

Item.displayName = Object.keys(Item).join("");

export { Item };
