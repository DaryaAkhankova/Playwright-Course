class CartPage {
  constructor(page) {
    this.page = page;
    this.titleOfProduct = page.locator('h3:has-text("zara coat 3")');
    this.deleteButton = page.locator('.btn-danger');
    this.textAboutRemoval = page.locator('div .ng-star-inserted').first();
    this.checkoutButton = page.locator('text=Checkout');
  }
}
module.exports = { CartPage };
