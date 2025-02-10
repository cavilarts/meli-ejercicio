import { Item } from "@/types/item";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const favoritesApiSlice = createApi({
  reducerPath: "favoritesApi",
  tagTypes: ["Item"],
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getFavorites: builder.query<Item[], undefined>({
      query: () => "favorites/get",
      providesTags: [{ id: "LIST", type: "Item" }],
    }),
    toggleFavorite: builder.mutation<Item, Item>({
      query: (item) => ({
        url: `favorites/add`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: [{ type: "Item", id: "LIST" }],
    }),
  }),
});

export const { useGetFavoritesQuery, useToggleFavoriteMutation } =
  favoritesApiSlice;

export default favoritesApiSlice;
