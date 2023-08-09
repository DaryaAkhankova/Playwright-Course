const { test, expect} = require('@playwright/test');
const { PageFactory } = require('../pageobjects/PageFactory');
const dataSet = JSON.parse(JSON.stringify(require('../test-data/TestData.json')));

test.describe('UI tests', () => {
  test.beforeEach(async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.goTo();
    await element.loginPage.validLogin(dataSet.username, dataSet.password);
  });
  
  test('check that checkbox on the main page is checked ', async ({ page }) => {
    const element = new PageFactory(page);
    await element.mainPage.checkbox.check();
    await expect(element.mainPage.checkbox).toBeChecked();
  
  });
  
  test('check that product is filtered according to the search box ', async ({ page }) => {
    const element = new PageFactory(page);
    await element.mainPage.searchField.type('adidas',{delay:100});
    await page.keyboard.press('Enter');
    await expect(element.mainPage.productTitle.nth(1)).toContainText('adidas');
  });
  
  test('check that main page is opened after clicking continue shopping button', async ({ page }) => {
    const element = new PageFactory(page);
    await element.mainPage.searchProductClickView(dataSet.productName);
    await element.mainPage.continueShopButton.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash');
  });
  
  test('check that number next to the cart is increased', async ({ page }) => {
    const element = new PageFactory(page);
    await element.mainPage.searchProductAddCart(dataSet.productName);
    await expect(element.mainPage.cart).toHaveText('1');
  });
  
  
  test('check that product is added and removed from the cart', async ({ page }) => {
    const element = new PageFactory(page);
    await element.mainPage.searchProductAddCart(dataSet.productName);
    await element.mainPage.cart.click();
    await expect(element.cartPage.titleOfProduct).toHaveText(dataSet.productName);
    await element.cartPage.deleteButton.click();
    await expect(element.cartPage.textAboutRemoval).toHaveText('No Products in Your Cart !');
  });
  
   test('check that order is created and displayed in the orders and then deleted', async ({ page }) => {
    const element = new PageFactory(page);
    await element.mainPage.searchProductAddCart(dataSet.productName);
    await element.mainPage.cart.click();
    await element.cartPage.checkoutButton.click();
    await element.createOrderPage.selectCountryButton.type('Poland');
    await element.createOrderPage.optionCountryDropdown.click();
    await expect(element.createOrderPage.emailInput).toHaveText(dataSet.username);
    await element.createOrderPage.placeOrderButton.click();
    await expect(element.createOrderPage.orderConfirmation).toHaveText(' Thankyou for the order. ');
    const orderId = await element.createOrderPage.submitAndGetOrderId();
    await element.createOrderPage.myOrderButton.click();
    await element.ordersPage.searchProductIdAndSelect(orderId);
    expect(orderId.includes(await element.orderDetailsPage.getOrderId())).toBeTruthy();
    await element.createOrderPage.myOrderButton.click();
    await element.ordersPage.searchProductIdAndDelete(orderId);
    await expect(element.ordersPage.textAboutRemoval).toHaveText(' You have No Orders to show at this time. Please Visit Back Us ');
  });
});












  






