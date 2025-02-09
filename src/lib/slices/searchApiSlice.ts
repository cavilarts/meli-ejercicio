import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ItemsSearchResponse } from "@/types/item";

const searchApiSlice = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    searchItem: builder.query<ItemsSearchResponse, string>({
      query: (query: string) => `items?q=${query}`,
    }),
  }),
});

export const { useSearchItemQuery } = searchApiSlice;

export default searchApiSlice;
