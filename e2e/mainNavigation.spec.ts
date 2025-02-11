import { test, expect } from "@playwright/test";

test("has a logo", async ({ page }) => {
  await page.goto(
    "https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/"
  );

  const logo = await page.$("data-testid=logo");
  expect(logo).not.toBeNull();
});

test("has a search input", async ({ page }) => {
  await page.goto(
    "https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/"
  );

  const searchInput = await page.$("data-testid=search-input");
  expect(searchInput).not.toBeNull();
});

test("has a search button", async ({ page }) => {
  await page.goto(
    "https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/"
  );

  const searchButton = await page.$("data-testid=search-button");
  expect(searchButton).not.toBeNull();
});

test("has a welcome message", async ({ page }) => {
  await page.goto(
    "https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/"
  );

  const welcomeMessage = await page.$("data-testid=welcome-message");
  expect(welcomeMessage).not.toBeNull();
});

test("hast to mavigate to items page when hitting enter on the search input", async ({
  page,
}) => {
  await page.goto(
    "https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/"
  );

  const searchInput = await page.$("data-testid=search-input");
  await searchInput?.fill("test");
  await searchInput?.press("Enter");

  await page.waitForURL(
    "https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/items?search=test"
  );

  const itemsPage = await page.$("data-testid=items-page");
  expect(itemsPage).not.toBeNull();
});

test("has to navigate to the items page when clicking on the search button", async ({
  page,
}) => {
  await page.goto(
    "https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/"
  );

  const searchInput = await page.$("data-testid=search-input");
  await searchInput?.fill("test");

  const searchButton = await page.$("data-testid=search-button");
  await searchButton?.click();

  await page.waitForURL(
    "https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/items?search=test"
  );

  const itemsPage = await page.$("data-testid=items-page");
  expect(itemsPage).not.toBeNull();
});

test("has to display search results", async ({ page }) => {
  await page.goto(
    "https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/items?search=ipad"
  );

  const loadingItes = await page.waitForSelector(
    "data-testid=spinner-component"
  );
  expect(loadingItes).not.toBeNull();

  const searchResults = await page.waitForSelector(
    "data-testid=search-results"
  );
  expect(searchResults).not.toBeNull();

  const items = await page.$$("data-testid=item");
  expect(items.length).toBeGreaterThan(0);

  const firstItem = items[0];
  const firstItemName = await firstItem.innerText();
  expect(firstItemName).toContain("iPad");
  expect(firstItemName).not.toContain("iPhone");
});

test("has to navigate to the item detail page when clicking on an item", async ({
  page,
}) => {
  await page.goto(
    "https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/items?search=ipad"
  );

  const searchResults = await page.waitForSelector(
    "data-testid=search-results"
  );
  expect(searchResults).not.toBeNull();

  const items = await page.$$("data-testid=item");
  const firstItem = items[0];
  const firsItemId = await firstItem.getAttribute("data-item-id");
  await firstItem.click();

  await page.waitForURL(
    `https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/items/${firsItemId}`
  );

  const itemDetailPage = await page.$("data-testid=item-detail-page");
  expect(itemDetailPage).not.toBeNull();
});

test("has to display the favorite buttons, add the favorite item to the list and navigate to the favorites page", async ({
  page,
}) => {
  await page.goto(
    "https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/items?search=ipad"
  );

  const searchResults = await page.waitForSelector(
    "data-testid=search-results"
  );
  expect(searchResults).not.toBeNull();

  const favoriteButton = await page.$$("data-testid=favorite-button");

  await favoriteButton[0].click();
  await favoriteButton[1].click();

  const favoritesLink = await page.$("data-testid=favorites-link-desktop");
  await expect(favoritesLink).not.toBeNull();

  await favoritesLink?.click();

  await page.waitForURL(
    "https://meli-ejercicio-git-main-cavilarts-projects.vercel.app/favorites"
  );

  const favorites = await page.$$("data-item-id");
  expect(favorites.length).toBe(2);

  const favoritesPage = await page.$("data-testid=favorites-page");
  expect(favoritesPage).not.toBeNull();
});
