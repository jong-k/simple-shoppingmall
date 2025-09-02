import { expect, test } from "@playwright/test";

test.describe("리스트 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/products");
  });

  test("상품 정보에 thumbnail, title, price 를 표시한다", async ({ page }) => {
    // 상품 리스트 로딩 대기
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 5000 });

    // 전체 ProductCard 리스트 확인
    const productCards = page.locator('[data-testid="product-card"]');
    // 최소 하나 이상의 ProductCard 존재하는지 확인
    await expect(productCards).toHaveCount(1);
    // 1번째 ProductCard 확인
    const firstProducts = productCards.first();
    // thumbnail img 엘리먼트 확인
    const thumbnail = firstProducts.locator("img");
    await expect(thumbnail).toBeVisible();
    await expect(thumbnail).toHaveAttribute("src", /.+/);
  });
});
