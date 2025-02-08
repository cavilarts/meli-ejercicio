import { test, describe, expect, beforeAll } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import { Navigation } from "./Navigation";
import { renderWithProviders } from "@/lib/test/testUtils";

describe("<Navigation />", () => {
  beforeAll(() => {
    renderWithProviders(<Navigation />);
  });

  test("should have the Mercado Libre logo", () => {
    expect(
      screen.getByRole("img", {
        name: "Mercado Libre Argentina - Donde comprar y vender de todo",
      })
    ).toBeDefined();
  });

  test("should have a link to go to the home page", () => {
    expect(
      screen.getByRole("link", {
        name: "Mercado Libre Argentina - Donde comprar y vender de todo",
      })
    ).toBeDefined();
  });

  test("should have a search input", () => {
    expect(screen.getByPlaceholderText("Nunca dejes de buscar")).toBeDefined();
  });

  test("should have a search button", () => {
    expect(screen.getByRole("button", { name: "Search" })).toBeDefined();
  });

  test("should have a hidden label for the search input", () => {
    expect(
      screen.getByLabelText("Search your favorite products")
    ).toBeDefined();
  });

  test("should have a search input with the value from the store", () => {
    expect(screen.getByDisplayValue("")).toBeDefined();
  });

  test("should update the search status when the button is clicked", () => {
    const button = screen.getByRole("button", { name: "Search" });
    button.click();
    expect(screen.getByDisplayValue("")).toBeDefined();
  });

  test("should update the search status when the enter key is pressed", () => {
    const input = screen.getByPlaceholderText("Nunca dejes de buscar");
    input.focus();
    input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter" }));
    expect(screen.getByDisplayValue("")).toBeDefined();
  });

  test("should update the search value when the input changes", async () => {
    const input = screen.getByPlaceholderText("Nunca dejes de buscar");
    input.focus();
    await input.dispatchEvent(new KeyboardEvent("keyup", { key: "A" }));
    waitFor(() => expect(screen.getByDisplayValue("A")).toBeDefined());
  });
});
