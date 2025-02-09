import { test, describe, expect, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import type { Item as ItemType } from "@/types/item";
import { Item } from "./Item";
import { renderWithProviders } from "@/lib/test/testUtils";

const mockedItem: ItemType = {
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
};

describe("<Item />", () => {
  beforeAll(() => {
    renderWithProviders(<Item item={mockedItem} />);
  });

  test("shouuld render a link to the item details", () => {
    const link = screen.getByRole("link", {
      name: /Item 1/i,
    });

    expect(link).toBeDefined();
  });

  test("should render the item image", () => {
    const image = screen.getByRole("img", { name: "Item 1" });

    expect(image).toBeDefined();
  });

  test("should render the item price", () => {
    const price = screen.getByText("US$ 100,00");

    expect(price).toBeDefined();
  });

  test("should render the free shipping icon", () => {
    const image = screen.getByRole("img", { name: "Free shipping" });

    expect(image).toBeDefined();
  });

  test("should render the free shipping image", () => {
    const image = screen.getByRole("img", { name: "Free shipping" });

    expect(image).toBeDefined();
  });

  test("should render the item title", () => {
    const title = screen.getByText("Item 1");

    expect(title).toBeDefined();
  });
});
