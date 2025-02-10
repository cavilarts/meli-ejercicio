import { test, expect } from "@playwright/test";

test("has a logo", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const logo = await page.$("data-testid=logo");
  expect(logo).not.toBeNull();
});

test("has a search input", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const searchInput = await page.$("data-testid=search-input");
  expect(searchInput).not.toBeNull();
});

test("has a search button", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const searchButton = await page.$("data-testid=search-button");
  expect(searchButton).not.toBeNull();
});

test("has a welcome message", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const welcomeMessage = await page.$("data-testid=welcome-message");
  expect(welcomeMessage).not.toBeNull();
});

test("hast to mavigate to items page when hitting enter on the search input", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  const searchInput = await page.$("data-testid=search-input");
  await searchInput?.fill("test");
  await searchInput?.press("Enter");

  await page.waitForURL("http://localhost:3000/items?search=test");

  const itemsPage = await page.$("data-testid=items-page");
  expect(itemsPage).not.toBeNull();
});

test("has to navigate to the items page when clicking on the search button", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  const searchInput = await page.$("data-testid=search-input");
  await searchInput?.fill("test");

  const searchButton = await page.$("data-testid=search-button");
  await searchButton?.click();

  await page.waitForURL("http://localhost:3000/items?search=test");

  const itemsPage = await page.$("data-testid=items-page");
  expect(itemsPage).not.toBeNull();
});

test("has to display search results", async ({ page }) => {
  await page.goto("http://localhost:3000/items?search=ipad");

  const loadingItes = await page.waitForSelector("text=Loading...");
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
  await page.goto("http://localhost:3000/items?search=ipad");

  const searchResults = await page.waitForSelector(
    "data-testid=search-results"
  );
  expect(searchResults).not.toBeNull();

  const items = await page.$$("data-testid=item");
  const firstItem = items[0];
  const firsItemId = await firstItem.getAttribute("data-item-id");
  await firstItem.click();

  await page.waitForURL(`http://localhost:3000/items/${firsItemId}`);

  const itemDetailPage = await page.$("data-testid=item-detail-page");
  expect(itemDetailPage).not.toBeNull();
});
