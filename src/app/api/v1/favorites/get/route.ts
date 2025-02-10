import { favorites } from "../favorites";

export async function GET() {
  try {
    return Response.json(favorites, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
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
