import { favorites } from "../favorites";

export async function POST(request: Request) {
  try {
    if (!request.body) {
      return Response.json(
        {
          message: "Invalid request",
        },
        {
          status: 400,
        }
      );
    }
    const body = await request.json();
    const { id } = body;
    const favorite = favorites.find((favorite) => favorite.id === id);
    if (favorite) {
      return Response.json(
        {
          message: "Favorite already exists",
        },
        {
          status: 400,
        }
      );
    }
    favorites.push(body);

    return Response.json(
      {
        message: "Favorite created",
        data: body,
      },
      {
        status: 201,
      }
    );
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
