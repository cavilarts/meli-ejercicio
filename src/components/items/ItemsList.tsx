"use client";

import { useSearchItemQuery } from "@/lib/slices/searchApiSlice";
import { Item } from "./Item";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { setSearchStatus } from "@/lib/slices/searchSlice";
import { Spinner } from "../spinner/Spinner";

function ItemsList() {
  const dispatch = useAppDispatch();
  const { value: q, enableSearch } = useAppSelector((store) => store.search);
  const { data, isFetching, isLoading } = useSearchItemQuery(q as string, {
    skip: !enableSearch,
  });

  useEffect(() => {
    if (enableSearch && !isFetching) {
      dispatch(setSearchStatus(false));
    }
  }, [enableSearch, isFetching, dispatch]);

  if (isFetching || isLoading) return <Spinner />;

  return (
    <section
      data-testid="search-results"
      className="grid grid-cols-1 md:max-w-7xl md:mx-auto"
    >
      {data?.items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </section>
  );
}

ItemsList.displayName = Object.keys(ItemsList).join("");

export default ItemsList;
