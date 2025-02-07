import type { NextRequest } from 'next/server';
import type { ItemsSearch } from '@types/item';

async function getProducts(q: string, maxItems: number): ItemsSearch {
  const res = await fetch(
    `${process.env.MELI_ITEMS_SEARCH_URL}/search?q=${q}&limit=${maxItems}`, {
    'Content-Type': 'application/json'
  });
  const { results, filters } = await res.json();
  const items = results?.map(({ id, title, currency_id, price, thumbnail, condition, shipping }) => ({
    id,
    title,
    price: {
      currency: currency_id,
      amount: price,
      decimals: price
    },
    picture: thumbnail,
    condition,
    free_shipping: shipping?.free_shipping,
    sold_quantity: 0, // @TODO calculate this amount?
    description: "get this value from it's endpoint"
  }));
  const categories = filters;
  
  return {
    author: {
      name: "Carlos",
      lastName: "Avila"
    },
    categories,
    items 
  };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const products = await getProducts(query, 5);
    
    return Response.json(products, {
      status: 200
    });
  } catch (e) {
    return Response.json({
      error: "An unexpected error has occurred",
      details: e,
    }, {
        status: 500,
    }); 
  }
}
