async function getCategory(id: string): Promise<string[]> {
  const response = await fetch(`${process.env.MELI_ITEM_CATEGORIES}${id}`);

  const { path_from_root } = await response.json();
  return path_from_root
    .map((category: { name: string }) => category.name)
    .reduce((acc: string[], item: string, index: number) => {
      if (index === path_from_root.length - 1) {
        return [...acc, item];
      }
      return [...acc, item, ">"];
    }, [] as string[]);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  const categories = await getCategory(id);

  return Response.json({ categories }, { status: 200 });
}
