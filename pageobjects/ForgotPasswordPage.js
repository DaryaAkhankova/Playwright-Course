class ForgotPasswordPage {
  constructor(page) {
    this.page = page;
    this.emailField = page.locator('[type="email"]');
    this.passwordField = page.locator('#userPassword');
    this.confirmPasswordField = page.locator('#confirmPassword');
    this.savePasswordButton = page.locator('[type="submit"]');
    this.loginButton = page.locator('[href*="login"]');
    this.registerButton = page.locator('[href*="register"]');
    this.errorMessage = page.locator('.invalid-feedback');
    this.allertMessage = page.locator('#toast-container');
  }
}
module.exports = { ForgotPasswordPage };
