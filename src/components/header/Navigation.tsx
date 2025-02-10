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
      <nav className="flex flex-col items-center justify-center">
        <Link className="py-8" href="/">
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
        <div className="flex w-full shadow-md gap-0 rounded-md overflow-hidden">
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
        </div>
      </nav>
    </Suspense>
  );
}

Navigation.displayName = Object.keys(Navigation).join("");

export { Navigation };
