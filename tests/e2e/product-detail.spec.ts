import { expect, test } from "@playwright/test";

test.describe("상세 페이지", () => {
  test("상품 상세 정보에 thumbnail, title, price, tags를 표시한다", async ({ page }) => {
    await page.goto("/products/1");
    await page.waitForSelector('[data-testid="product-detail"]', { timeout: 10_000 });
    const productDetail = page.locator('[data-testid="product-detail"]');

    // thumbnail 확인
    const thumbnail = productDetail.locator("img");
    await expect(thumbnail).toBeVisible();
    await expect(thumbnail).toHaveAttribute("src", /.+/);

    // title 확인
    const title = productDetail.locator('[data-testid="product-title"]');
    await expect(title).toBeVisible();
    await expect(title).toHaveText(/.+/);

    // price 확인
    const price = productDetail.locator('[data-testid="product-price"]');
    await expect(price).toBeVisible();
    await expect(price).toHaveText(/^\d+\.?\d*$/);

    // tags 확인
    const tags = productDetail.locator('[data-testid="product-tag"]');
    const tagsCount = await tags.count();
    expect(tagsCount).toBeGreaterThan(0);
  });
});
