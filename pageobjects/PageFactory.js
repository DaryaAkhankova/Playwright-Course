const { MainPage } = require('./MainPage');
const { LoginPage } = require('./LoginPage');
const { CartPage } = require('./CartPage');
const { CreateOrderPage } = require('./CreateOrderPage');
const { OrdersPage } = require('./OrdersPage');
const { OrderDetailsPage } = require('./OrderDetailsPage');

class PageFactory {
  constructor(page) {
    this.page = page;
    this.mainPage = new MainPage(page);
    this.loginPage = new LoginPage(page);
    this.cartPage = new CartPage(page);
    this.createOrderPage = new CreateOrderPage(page);
    this.ordersPage = new OrdersPage(page);
    this.orderDetailsPage = new OrderDetailsPage(page);
  }
}

module.exports = { PageFactory };
