import { expect, test } from "@playwright/test";

test.describe("리스트 페이지", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/products");
  });

  test("상품 정보에 thumbnail, title, price 를 표시한다", async ({ page }) => {
    // 상품 리스트 로딩 대기
    await page.waitForSelector('[data-testid="product-card"]', { timeout: 10_000 });
    // 1번째 상품 카드 확인
    const firstProduct = page.locator('[data-testid="product-card"]').first();

    // thumbnail 확인
    const thumbnail = firstProduct.locator("img");
    await expect(thumbnail).toBeVisible();
    await expect(thumbnail).toHaveAttribute("src", /.+/);

    // title 확인
    const title = firstProduct.locator('[data-testid="product-title"]');
    await expect(title).toBeVisible();
    await expect(title).toHaveText(/.+/);

    // price 확인
    const price = firstProduct.locator('[data-testid="product-price"]');
    await expect(price).toBeVisible();
    await expect(price).toHaveText(/^\d+\.?\d*$/);
  });

  test("상품 카드 클릭 시 상품 상세페이지로 이동한다", async ({ page }) => {
    await page.waitForSelector('[data-testId="product-card"]', { timeout: 10_000 });
    // 1번째 상품 카드 확인
    const firstProduct = page.locator('[data-testid="product-card"]').first();
    // 상품 카드 클릭
    await firstProduct.click();
    // /products/{id} 로 url 변경될 때 까지 대기
    await page.waitForURL(/\/products\/\d+/);
    // 현재 페이지가 상품 상세 페이지인지 확인
    expect(page.url()).toMatch(/\/products\/\d+$/);
  });

  test("상품 정보를 스크롤에 따라 20개 추가 로드한다(무한 스크롤)", async ({ page }) => {
    await page.waitForSelector('[data-testId="product-card"]', { timeout: 10_000 });
    // 초기 상품 리스트 갯수
    const initialCount = await page.locator('[data-testid="product-card"]').count();
    // 초기 상품 리스트 갯수가 20개인지 확인
    expect(initialCount).toBe(20);
    // 맨 아래로 스크롤하여 무한 스크롤 발생
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(2_000);
    const newCount = await page.locator('[data-testid="product-card"]').count();
    expect(newCount).toBe(initialCount + 20);
  });
});
