export const dynamic = "force-dynamic";

import { FavoriteButton } from "@/components/favorites/FavoriteButton";
import type { ItemExtra } from "@/types/item";
import Image from "next/image";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function getProduct(id: string): Promise<ItemExtra> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/items/${id}`
  );
  const { item } = await response.json();

  return item;
}

async function getFavorite(id: string): Promise<boolean> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/favorites/get/`
  );
  const { favorites } = await response.json();

  return favorites?.includes(id) ?? false;
}

export default async function ProductPage(props: PageProps) {
  const { id } = await props.params;
  const item: ItemExtra = await getProduct(id);
  const mainImage = item.pictures?.[0]?.url ?? "";
  const favorite = await getFavorite(id);

  const formatPrice = (price: number) => {
    return price.toLocaleString("es-AR", {
      style: "currency",
      currency: item.price.currency,
      minimumFractionDigits: item.price.decimals,
      maximumFractionDigits: item.price.decimals,
    });
  };

  return (
    <section className="p-4" data-testid="item-detail-page">
      <article className="flex flex-col">
        <div className="flex flex-col">
          <Image src={mainImage} alt={item.title} width={500} height={700} />
        </div>
        <div>
          <p>
            {item.condition} - {item.sold_quantity} vendidos
          </p>
          <div>
            <h1>{item.title}</h1>
            <FavoriteButton item={{ ...item, favorite }} />
            {/* <button
              data-testid="favorite-button"
              className="text-red-500 p-2 rounded-md"
              onClick={handleClick}
            >
              {favorite ? <FaHeart /> : <FaRegHeart />}
            </button> */}
          </div>
          <p>{formatPrice(item.price.amount)}</p>
          <p>{item.free_shipping && <span>Envío gratis</span>}</p>
          <button>Comprar</button>
        </div>
        <div>
          <h2>Descripción del producto</h2>
          <p>{item.description}</p>
        </div>
      </article>
    </section>
  );
}
