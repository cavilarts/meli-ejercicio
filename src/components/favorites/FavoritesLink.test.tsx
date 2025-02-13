import {
  test,
  describe,
  expect,
  beforeAll,
  vitest,
  afterAll,
  vi,
} from "vitest";
import { screen } from "@testing-library/react";
import { FavoritesLink } from "./FavoritesLink";
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

describe("<FavoritesLink />", () => {
  beforeAll(() => {
    renderWithProviders(<FavoritesLink id={""} />);
  });

  afterAll(() => {
    vitest.resetAllMocks();
  });

  test("should have a link to go to the favorites page", () => {
    expect(screen.getByRole("link", { name: "Favoritos 2" })).toBeDefined();
  });

  test("should have a heart icon", () => {
    expect(screen.getByRole("graphics-symbol")).toBeDefined();
  });

  test("should have a counter with the number of favorites", () => {
    expect(screen.getByRole("status")).toBeDefined();
  });

  test("should render the number of favorites", () => {
    expect(screen.getByText("2")).toBeDefined();
  });
});
