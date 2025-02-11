import { vitest, vi, beforeAll, describe, test, expect } from "vitest";
import { screen } from "@testing-library/react";
import { FavoritesList } from "./FavoritesList";
import { renderWithProviders } from "@/lib/test/testUtils";

const mockedItemsList = [
  {
    id: "1",
    title: "Item 1",
    price: {
      currency: "USD",
      amount: 100,
      decimals: 2,
    },
    picture: "https://example.com/item.jpg",
    condition: "",
    free_shipping: true,
  },
  {
    id: "2",
    title: "Item 2",
    price: {
      currency: "USD",
      amount: 200,
      decimals: 2,
    },
    picture: "https://example.com/item.jpg",
    condition: "",
    free_shipping: true,
  },
];

vi.mock("@/lib/slices/favoritesApiSlice", async (importOriginal) => {
  const original = await importOriginal();

  return {
    ...(typeof original === "object" ? original : {}),
    useGetFavoritesQuery: () => ({
      data: mockedItemsList,
      error: null,
      isFetching: false,
    }),
    useToggleFavoriteMutation: () => [
      vitest.fn(),
      {
        data: mockedItemsList,
        error: null,
        isFetching: false,
      },
    ],
  };
});

describe("<FavoritesList />", () => {
  beforeAll(() => {
    renderWithProviders(<FavoritesList />);
  });

  test("should render a list of items", async () => {
    const items = screen.getAllByRole("article");

    expect(items).toHaveLength(2);
  });
});
