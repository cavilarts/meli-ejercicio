"use client";

import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import ItemsList from "@/components/items/ItemsList";
import { useAppDispatch } from "@/lib/hooks";
import { setSearchStatus, setSearchValue } from "@/lib/slices/searchSlice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSearchValue(query));
    dispatch(setSearchStatus(true));
  }, [query, dispatch]);

  return (
    <main
      className="bg-gray-100 h-screen w-screen flex flex-col"
      data-testid="items-page"
    >
      <Breadcrumbs />
      <ItemsList />
    </main>
  );
}
