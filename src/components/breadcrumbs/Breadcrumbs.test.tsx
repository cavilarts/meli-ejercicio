import { renderWithProviders } from "@/lib/test/testUtils";
import { ItemsSearchResponse } from "@/types/item";
import { screen } from "@testing-library/react";
import { test, describe, expect, beforeAll, vi, afterAll } from "vitest";
import { Breadcrumbs } from "./Breadcrumbs";

const mockedSearchAPIResponse: ItemsSearchResponse = {
  author: {
    name: "Carlos",
    lastname: "Avila",
  },
  categories: ["Consolas y Videojuegos", "Consolas"],
  items: [
    {
      id: "MLA1796886016",
      title: "Microsoft Xbox Series X 1tb Ssd 120 Hz 4k Color Negro",
      price: {
        currency: "ARS",
        amount: 1553465,
        decimals: 2,
      },
      picture: "http://http2.mlstatic.com/D_989929-MLU75813976098_042024-I.jpg",
      condition: "new",
      free_shipping: true,
    },
  ],
};

vi.mock("@/lib/slices/searchApiSlice", async (importOriginal) => {
  const original = await importOriginal();

  return {
    ...(typeof original === "object" ? original : {}),
    useSearchItemQuery: () => ({
      data: mockedSearchAPIResponse,
      error: null,
      isFetching: false,
    }),
  };
});

describe("<Breadcrumbs />", () => {
  beforeAll(() => {
    renderWithProviders(<Breadcrumbs />);
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  test("should render the breadcrumbs according the categories delivered by search", () => {
    expect(
      screen.getByRole("link", { name: "Consolas y Videojuegos" })
    ).toBeDefined();
    expect(screen.getByRole("link", { name: "Consolas" })).toBeDefined();
    expect(screen.getAllByTestId("separator").length).toBe(1);
  });
});
