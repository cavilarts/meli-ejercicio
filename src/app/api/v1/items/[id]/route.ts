import type { NextRequest } from 'next/server';
import type { ItemDetails } from "@types/item";

async function getProduct(productId:string): ItemDetails {
  const itemResponse = await fetch(`${process.env.MELI_ITEM_DETAILS}${productId}`);
  const { id, title, price, currency_id, pictures, condition, shipping } = await itemResponse.json();
  const description = await getProductDescription(productId);

  return {
    author: {
      name: "Carlos",
      lastName: "Avila"
    },
    item: {
      id,
      title,
      price: {
        currency: currency_id,
        amount: price,
        decimals: 2,
      },
      picture: pictures,
      condition,
      free_shipping: shipping.free_shipping,
      sold_quantity: 0,
      description,
    }
  }
}

async function getProductDescription(id: string): string {
  const descriptionResponse = await fetch(`${process.env.MELI_ITEM_DETAILS}${id}/description`);
  const { plain_text, ...rest } = await descriptionResponse.json();
  return plain_text;
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = (await params).id; 
    
    if (!id) {
      return Response.json({
        error: "Please send an Id"
      }, {
        status: 400
      })
    }

    const product = await getProduct(id);

    return Response.json(product, {
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
