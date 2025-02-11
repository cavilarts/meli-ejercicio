export const dynamic = "force-dynamic";

import { BreadcrumbsServer } from "@/components/breadcrumbs/BreadcrumbsServer";
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
    `${process.env.NEXT_PUBLIC_API_URL}/favorites/get`
  );
  const favorites = await response.json();
  const favorite = favorites?.find((favorite: ItemExtra) => favorite.id === id);

  return favorite ? true : false;
}

async function getCategories(id: string): Promise<string[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`
  );
  const { categories } = await response.json();

  return categories;
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
    <section
      className="bg-gray-100 overflow-hidden pb-8"
      data-testid="item-detail-page"
    >
      <BreadcrumbsServer items={await getCategories(item.category)} />
      <article className="bg-white p-4 rounded-lg w-screen md:max-w-7xl md:mx-auto md:flex-row">
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col">
            <Image
              className=""
              src={mainImage}
              alt={item.title}
              width={680}
              height={680}
              priority
            />
          </div>
          <div className="pt-8">
            <p className="text-sm text-gray-500 mb-4">
              {item.condition} - {item.sold_quantity} vendidos
            </p>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl text-black font-bold md:max-w-52">
                {item.title}
              </h1>
              {item.free_shipping && (
                <Image
                  src="/images/ic_shipping.png"
                  alt="Free shipping"
                  width="24"
                  height="24"
                />
              )}
              <FavoriteButton item={{ ...item, favorite }} />
            </div>
            <h2 className="text-4xl text-black py-8">
              {formatPrice(item.price.amount)}
            </h2>
            <button className="bg-blue-700 text-white w-full rounded-lg p-4 text-xl md:w-[380px]">
              Comprar
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-3xl py-8 text-black font-bold">
            Descripción del producto
          </h2>
          <p className="text-gray-500 mb-8 text-base">{item.description}</p>
        </div>
      </article>
    </section>
  );
}
