import type { NextRequest } from "next/server";
import type { ItemsSearchResponse } from "@/types/item";
import type { ItemAPIResponse } from "@/types/itemApi";

async function getProducts(
  q: string,
  maxItems: number
): Promise<ItemsSearchResponse> {
  const res = await fetch(
    `${process.env.MELI_ITEMS_SEARCH_URL}/search?q=${q}&limit=${maxItems}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { results, filters }: ItemAPIResponse = await res.json();
  const items = results?.map(
    ({ id, title, currency_id, price, thumbnail, condition, shipping }) => ({
      id,
      title,
      price: {
        currency: currency_id,
        amount: price,
        decimals: 2,
      },
      picture: thumbnail,
      condition,
      free_shipping: shipping?.free_shipping,
      sold_quantity: 0,
      description: "get this value from it's endpoint",
    })
  );
  const categories = filters.map((category) => category.name);

  return {
    author: {
      name: "Carlos",
      lastname: "Avila",
    },
    categories,
    items,
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q");
    const products = await getProducts(query ?? "", 5);

    return Response.json(products, {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return Response.json(
      {
        message: "An unexpected error has occurred",
      },
      {
        status: 500,
      }
    );
  }
}
