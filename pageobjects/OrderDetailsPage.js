class OrderDetailsPage {
  constructor(page) {
    this.page = page;
    this.orderIdDetails = page.locator('div .col-text');
  }

  async getOrderId() {
    return await this.orderIdDetails.textContent();
  }
}
module.exports = { OrderDetailsPage };
