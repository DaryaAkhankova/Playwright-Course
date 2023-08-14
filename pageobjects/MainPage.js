class MainPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productTitle = page.locator('.card-body b');
    this.cart = page.locator('.btn-custom label');
    this.searchField = page.locator('div[class="py-2 border-bottom ml-3"] input[placeholder="search"]');
    this.checkbox = page.locator('#sidebar form div:nth-child(3) div:nth-child(3) input[type=checkbox]');
    this.continueShopButton = page.locator('div .continue');
  }

  async searchProductAddCart(productName) {
    const count = await this.products.count();
    for (let i = 0; i <= count; i++) {
      if (
        (await this.products.nth(i).locator('b').textContent()) === productName
      ) {
        await this.products.nth(i).locator('text= Add To Cart').click();
        break;
      }
    }
  }

  async searchProductClickView(productName) {
    const count = await this.products.count();
    for (let i = 0; i <= count; i++) {
      if (
        (await this.products.nth(i).locator('b').textContent()) === productName
      ) {
        await this.products.nth(i).locator('text= View').click();
        break;
      }
    }
  }
}
module.exports = { MainPage };
