"use client";

import { ChangeEvent, KeyboardEvent } from "react";
import { setSearchStatus, setSearchValue } from "@/lib/slices/searchSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";

function Navigation() {
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((store) => store.search);

  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      updateSearchStatus();
    }
  };

  const handleSearchButtonClick = (): void => {
    updateSearchStatus();
  };

  const updateSearchStatus = (): void => {
    dispatch(setSearchStatus(true));
  };

  const hanldeInputChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchValue(evt.target.value));
  };

  return (
    <nav className="flex flex-col items-center justify-center">
      <Link className="py-8" href="/">
        <Image
          className="w-[84px] h-[54px]"
          src="/images/Logo_ML@2x.png"
          alt="Mercado Libre Argentina - Donde comprar y vender de todo"
          width="134"
          height="34"
          priority
        />
      </Link>
      <div className="flex w-full shadow-sm gap-0 rounded-md overflow-hidden">
        <label className="invisible w-0" htmlFor="search">
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
        />
        <button className="px-4 bg-gallery" onClick={handleSearchButtonClick}>
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
  );
}

Navigation.displayName = Object.keys(Navigation).join("");

export { Navigation };
