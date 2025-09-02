import { expect, test } from "@playwright/test";

test.describe("리스트 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/products");
  });

  test("상품 정보에 thumbnail, title, price 를 표시한다", async ({ page }) => {
    // 상품 리스트 로딩 대기
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10_000 });
    // 전체 ProductCard 리스트 확인
    const productCards = page.locator('[data-testid="product-card"]');
    // 20개 ProductCard 존재하는지 확인
    await expect(productCards).toHaveCount(20);
    // 1번째 ProductCard 확인
    const firstProducts = productCards.first();

    // thumbnail img 엘리먼트 확인
    const thumbnail = firstProducts.locator("img");
    await expect(thumbnail).toBeVisible();
    await expect(thumbnail).toHaveAttribute("src", /.+/);

    // title 확인
    const title = firstProducts.locator('[data-testid="product-title"]');
    await expect(title).toBeVisible();
    await expect(title).toHaveText(/.+/);

    // price 확인
    const price = firstProducts.locator('[data-testid="product-price"]');
    await expect(price).toBeVisible();
    await expect(price).toHaveText(/^\d+\.?\d*$/);
  });

  test("상품 카드 클릭 시 상품 상세페이지로 이동한다", async ({ page }) => {
    await page.waitForSelector('[data-testId="product-card"]', { timeout: 10_000 });
    // 1번째 상품 카드
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    // click
    await firstProduct.click();
    // /products/{id} 로 url 변경될 때 까지 대기
    await page.waitForURL(/\/products\/\d+/);
    // 현재 페이지가 상품 상세 페이지인지 확인
    expect(page.url()).toMatch(/\/products\/\d+$/);
  });
});
