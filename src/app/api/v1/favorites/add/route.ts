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

    if (favorite !== undefined) {
      favorites.splice(favorites.indexOf(favorite), 1);
    } else {
      favorites.push(body);
    }

    return Response.json(favorites, {
      status: 201,
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
