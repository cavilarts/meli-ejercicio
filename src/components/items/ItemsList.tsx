"use client";

import { useSearchItemQuery } from "@/lib/slices/searchApiSlice";
import { Item } from "./Item";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { setSearchStatus } from "@/lib/slices/searchSlice";

function ItemsList() {
  const dispatch = useAppDispatch();
  const { value: q, enableSearch } = useAppSelector((store) => store.search);
  const {
    data,
    error: e,
    isFetching,
  } = useSearchItemQuery(q as string, {
    skip: !enableSearch,
  });

  useEffect(() => {
    if (enableSearch && !isFetching) {
      dispatch(setSearchStatus(false));
    }
  }, [enableSearch, isFetching, dispatch]);

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
