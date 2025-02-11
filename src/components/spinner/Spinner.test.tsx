import { test, describe, expect, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import { Spinner } from "./Spinner";
import { renderWithProviders } from "@/lib/test/testUtils";

describe("<Spinner />", () => {
  beforeAll(() => {
    renderWithProviders(<Spinner />);
  });

  test("should render the spinner component", () => {
    const spinner = screen.getByTestId("spinner-component");

    expect(spinner).toBeDefined();
  });

  test("should render the spinner icon", () => {
    const spinner = screen.getByTestId("spinner");

    expect(spinner).toBeDefined();
  });
});
