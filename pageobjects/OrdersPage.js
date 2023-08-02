class OrdersPage {
  constructor(page) {
    this.page = page;
    this.orderRows = page.locator('tbody tr');
    this.orderIdDetails = page.locator('div .col-text');
  }

  async searchProductIdAndSelect(orderId) {
    for (let i = 0; i <= (await this.orderRows.count()); i++) {
      const rowOrderId = await this.orderRows.nth(i).locator('th').textContent();
      if (orderId.includes(rowOrderId)) {
        await this.orderRows.nth(i).locator('button').first().click();
        break;
      }
    }
  }

  async getOrderId() {
    return await this.orderIdDetails.textContent();
  }
}
module.exports = { OrdersPage };
