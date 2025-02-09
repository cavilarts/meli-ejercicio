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
    });
  };

  return (
    <Link href={`/items/${item.id}`} passHref>
      <article>
        <Image src={item.picture} alt={item.title} width="60" height="60" />
        <div>
          <div>
            <p>{formatPrice(item.price.amount)}</p>
            <Image
              src="/images/ic_shipping.png"
              alt="Free shipping"
              width="18"
              height="18"
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
