class CreateOrderPage {
  constructor(page) {
    this.page = page;
    this.selectCountryButton = page.locator('[placeholder = "Select Country"]');
    this.optionCountryDropdown = page.locator('.ta-item.list-group-item');
    this.placeOrderButton = page.locator('.btnn.action__submit');
    this.emailInput = page.locator('.user__name label[type="text"]');
    this.orderConfirmation = page.locator('.hero-primary');
    this.myOrderButton = page.locator("button[routerlink*='myorders']");
    this.orderId = page.locator('.em-spacer-1 .ng-star-inserted');
  }

  async submitAndGetOrderId() {
    return await this.orderId.textContent();
  }
}
module.exports = { CreateOrderPage };
