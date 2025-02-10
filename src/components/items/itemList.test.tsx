import { test, describe, expect, beforeAll, vi, afterAll } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import type { Item as ItemType } from "@/types/item";
import { renderWithProviders } from "@/lib/test/testUtils";
import ItemsList from "./ItemsList";

const mockedItemList: ItemType[] = [
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

vi.mock("@/lib/slices/searchApiSlice", async (importOriginal) => {
  const original = await importOriginal();

  return {
    ...(typeof original === "object" ? original : {}),
    useSearchItemQuery: () => ({
      data: {
        items: mockedItemList,
      },
      error: null,
      isFetching: false,
    }),
  };
});

describe("<ItemsList />", () => {
  beforeAll(() => {
    renderWithProviders(<ItemsList />);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  test("should render a list of items", async () => {
    const items = screen.getAllByRole("article");

    waitFor(() => {
      expect(items.length).toBe(2);
    });
  });

  test("should render the item title", () => {
    const title = screen.getByText("Item 1");
    const title2 = screen.getByText("Item 2");

    expect(title).toBeDefined();
    expect(title2).toBeDefined();
  });

  test("should render the item price", () => {
    const price = screen.getByText("US$ 100,00");
    const price2 = screen.getByText("US$ 200,00");

    expect(price).toBeDefined();
    expect(price2).toBeDefined();
  });

  test("should render the free shipping icon", () => {
    const image = screen.getAllByRole("img", { name: "Free shipping" });

    expect(image.length).toBe(2);
  });

  test("should render the item image", () => {
    const image = screen.getByRole("img", { name: "Imagen de Item 1" });
    const image2 = screen.getByRole("img", { name: "Imagen de Item 2" });

    expect(image).toBeDefined();
    expect(image2).toBeDefined();
  });

  test("should render a link to the item details", () => {
    const link = screen.getAllByRole("link");

    expect(link.length).toBe(2);
  });
});
