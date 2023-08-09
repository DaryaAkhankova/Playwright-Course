class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInbutton = page.locator('[value="Login"]');
    this.userName = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    this.errorMessage = page.locator('.invalid-feedback');
    this.allertMessage = page.locator('#toast-container');
    this.registerLink = page.locator('div .login-wrapper-footer-text');
    this.forgotPasswordLink = page.locator('div .forgot-password-link');
  }

  async goTo() {
    await this.page.goto('https://rahulshettyacademy.com/client/');
  }

  async validLogin(username, password) {
    await this.userName.type(username);
    await this.password.type(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
module.exports = { LoginPage };
