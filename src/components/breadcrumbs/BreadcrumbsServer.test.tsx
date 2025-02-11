import { renderWithProviders } from "@/lib/test/testUtils";
import { screen } from "@testing-library/react";
import { test, describe, expect, beforeAll, vi, afterAll } from "vitest";
import { BreadcrumbsServer } from "./BreadcrumbsServer";

const mockICategories = ["Consolas y Videojuegos", ">", "Consolas"];

describe("<BreadcrumbsServer />", () => {
  beforeAll(() => {
    renderWithProviders(<BreadcrumbsServer items={mockICategories} />);
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
