"use client";

import {
  ChangeEvent,
  KeyboardEvent,
  Suspense,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FavoritesLink } from "../favorites/FavoritesLink";

function Navigation() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      updateSearchStatus(value);
    }
  };

  const handleSearchButtonClick = (): void => {
    updateSearchStatus(value);
  };

  const updateSearchStatus = (value: string): void => {
    router.push(`/items?search=${value}`);
  };

  const hanldeInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setValue(evt.target.value);
  };

  useEffect(() => {
    setValue(query);
  }, [query]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <nav className="flex flex-col items-center justify-center md:flex-row md:justify-between bg-primar md:items-center md:p-4 md:gap-2 md:max-w-7xl md:mx-auto">
        <div className="flex w-full justify-between items-center p-4 md:w-auto md:p-0">
          <Link className="py-8 md:py-0" href="/">
            <Image
              className="w-[84px] h-[54px]"
              src="/images/Logo_ML@2x.png"
              alt="Mercado Libre Argentina - Donde comprar y vender de todo"
              width="134"
              height="34"
              priority
              data-testid="logo"
            />
          </Link>
          <div className="md:hidden">
            <FavoritesLink className="md:hidden" id="mobile" />
          </div>
        </div>
        <div className="flex w-full shadow-md gap-0 rounded-md overflow-hidden md:shadow-none">
          <label className="invisible w-0 h-0" htmlFor="search">
            Search your favorite products
          </label>
          <input
            id="search"
            className="flex-1 p-4"
            type="text"
            placeholder="Nunca dejes de buscar"
            onChange={hanldeInputChange}
            onKeyUp={handleKeyUp}
            value={value}
            data-testid="search-input"
          />
          <button
            className="px-4 bg-gallery"
            onClick={handleSearchButtonClick}
            data-testid="search-button"
          >
            <Image
              className=""
              src="/images/ic_Search.png"
              alt="Search"
              width="25"
              height="25"
            />
          </button>
          <div className="hidden md:flex">
            <FavoritesLink id="desktop" />
          </div>
        </div>
      </nav>
    </Suspense>
  );
}

Navigation.displayName = Object.keys(Navigation).join("");

export { Navigation };
