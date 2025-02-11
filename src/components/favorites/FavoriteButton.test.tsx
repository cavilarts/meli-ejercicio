import {
  vi,
  vitest,
  describe,
  beforeAll,
  afterAll,
  expect,
  test,
} from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "@/lib/test/testUtils";
import { FavoriteButton } from "./FavoriteButton";

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
const mockMutationFunction = vitest.fn();

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
      mockMutationFunction,
      {
        data: mockedItemsList,
        error: null,
        isFetching: false,
      },
    ],
  };
});

describe("<FavoriteButton />", () => {
  beforeAll(() => {
    renderWithProviders(
      <FavoriteButton item={{ ...mockedItemsList[0], favorite: true }} />
    );
  });

  afterAll(() => {
    vitest.resetAllMocks();
  });

  test("should render the favorite button", async () => {
    const button = screen.getByRole("button");

    expect(button).toBeDefined();
  });

  test("should call the mutation function when clicking the button", async () => {
    const button = screen.getByRole("button");

    button.click();

    expect(mockMutationFunction).toHaveBeenCalled();
  });
});
