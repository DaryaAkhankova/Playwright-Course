const { MainPage } = require('./MainPage');
const { LoginPage } = require('./LoginPage');
const { CartPage } = require('./CartPage');
const { CreateOrderPage } = require('./CreateOrderPage');
const { OrdersPage } = require('./OrdersPage');
const { OrderDetailsPage } = require('./OrderDetailsPage');
const { RegistrationPage } = require('./RegistrationPage');
const { ForgotPasswordPage } = require('./ForgotPasswordPage');

class PageFactory {
  constructor(page) {
    this.page = page;
    this.mainPage = new MainPage(page);
    this.loginPage = new LoginPage(page);
    this.cartPage = new CartPage(page);
    this.createOrderPage = new CreateOrderPage(page);
    this.ordersPage = new OrdersPage(page);
    this.orderDetailsPage = new OrderDetailsPage(page);
    this.registrationPage = new RegistrationPage(page);
    this.forgotPasswordPage = new ForgotPasswordPage(page);
  }
}

module.exports = { PageFactory };
