class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.locator('#firstName');
    this.lastNameField = page.locator('#lastName');
    this.emailField = page.locator('#userEmail');
    this.mobilePhoneField = page.locator('#userMobile');
    this.occupationDropdown = page.locator('[formcontrolname="occupation"]');
    this.genderRadioButton = page.locator('[type="radio"]');
    this.passwordField = page.locator('#userPassword');
    this.confirmPasswordField = page.locator('#confirmPassword');
    this.checkboxAge = page.locator('[type="checkbox"]');
    this.registerButton = page.locator('#login');
    this.confirmMessage = page.locator('[class="headcolor"]');
    this.loginButton = page.locator('div .login-wrapper-footer-text');
    this.allertMessage = page.locator('#toast-container');
    this.errorMessageFields = page.locator('.invalid-feedback');
    this.errorMessageCheckbox = page.locator('[style*="margin-top"] div');
  }

  async registration(firstName,lastName,email,phoneNumber,password,confirmPassword) {
    await this.firstNameField.type(firstName);
    await this.lastNameField.type(lastName);
    await this.emailField.type(email);
    await this.mobilePhoneField.type(phoneNumber);
    await this.passwordField.type(password);
    await this.confirmPasswordField.type(confirmPassword);
    await this.checkboxAge.check();
    await this.registerButton.click();
  }

  async registrationWithoutLastName(firstName,email,phoneNumber,password,confirmPassword) {
    await this.firstNameField.type(firstName);
    await this.emailField.type(email);
    await this.mobilePhoneField.type(phoneNumber);
    await this.passwordField.type(password);
    await this.confirmPasswordField.type(confirmPassword);
    await this.checkboxAge.check();
    await this.registerButton.click();
  }

  async registrationWithoutCheckbox(firstName,lastName,email,phoneNumber,password,confirmPassword) {
    await this.firstNameField.type(firstName);
    await this.lastNameField.type(lastName);
    await this.emailField.type(email);
    await this.mobilePhoneField.type(phoneNumber);
    await this.passwordField.type(password);
    await this.confirmPasswordField.type(confirmPassword);
    await this.registerButton.click();
  }
}
module.exports = { RegistrationPage };
