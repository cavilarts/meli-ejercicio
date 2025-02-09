"use client";

import { useSearchItemQuery } from "@/lib/slices/searchApiSlice";
import { Item } from "./Item";
import { useAppSelector } from "@/lib/hooks";

function ItemsList() {
  const { value: q } = useAppSelector((store) => store.search);
  const { data, error: e, isFetching } = useSearchItemQuery(q as string);

  if (isFetching) return <div>Loading...</div>;

  if (e) return <div>Error: {JSON.stringify(e)}</div>;

  return (
    <section>
      {data?.items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </section>
  );
}

ItemsList.displayName = Object.keys(ItemsList).join("");

export default ItemsList;
