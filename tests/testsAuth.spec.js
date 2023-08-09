const { test, expect } = require('@playwright/test');
const { PageFactory } = require('../pageobjects/PageFactory');
const dataSet = JSON.parse(
  JSON.stringify(require('../test-data/TestData.json'))
);

test.describe('Tests for checking registration', () => {
  test.beforeEach(async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.goTo();
    await element.loginPage.registerLink.click();
  });

  test('check that user is successfully registered from the login page', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.confirmMessage).toHaveText('Account Created Successfully');
  });

  test('check that user is successfully registered from the forgot password page', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.loginButton.click();
    await element.loginPage.forgotPasswordLink.click();
    await element.forgotPasswordPage.registerButton.click();
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail2,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.confirmMessage).toHaveText('Account Created Successfully');
  });

  test('check that already created user cannot register', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.allertMessage).toHaveText(' User already exisits with this Email Id! ');
  });

  test('check that user cannot register without filling in required fields', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.occupationDropdown.selectOption('Student');
    await element.registrationPage.genderRadioButton.first().click();
    await element.registrationPage.checkboxAge.check();
    await element.registrationPage.registerButton.click();
    await expect(element.registrationPage.errorMessageFields.nth(0)).toContainText('is required');
    await expect(element.registrationPage.errorMessageFields.nth(1)).toContainText('is required');
    await expect(element.registrationPage.errorMessageFields.nth(2)).toContainText('is required');
    await expect(element.registrationPage.errorMessageFields.nth(3)).toContainText('is required');
    await expect(element.registrationPage.errorMessageFields.nth(4)).toContainText('is required');
  });

  test('check that user cannot register without populating Last Name field', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registrationWithoutLastName(
      dataSet.userFirstName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.allertMessage).toHaveText(' Last Name is required! ');
  });

  test('check that user cannot register without checking required checkbox', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registrationWithoutCheckbox(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.errorMessageCheckbox).toHaveText('*Please check above checkbox');
  });

  test('validating First Name when the length of the field is less than the minimum', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.minLengthFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.errorMessageFields).toHaveText('*First Name must be 3 or more character long');
  });

  test('validating First Name field exceeding the max allowed length', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.maxLengthFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.errorMessageFields).toHaveText('*First Name must be 12 or less character long');
  });

  test('validating Last Name when the length of the field is less than the minimum', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.minLengthLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.allertMessage).toHaveText('last Name must be 3 to 20 characters long!');
  });

  test('validating Last Name field exceeding the max allowed length', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.maxLengthLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.allertMessage).toHaveText('last Name must be 3 to 20 characters long!');
  });

  test('check that user cannot register with existing email', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.allertMessage).toHaveText(' User already exisits with this Email Id! ');
  });

  test('check that user cannot register with invalid email', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userInvalidEmail,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.errorMessageFields).toHaveText('*Enter Valid Email');
  });

  test('validating Email field exceeding the max allowed length', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userInvalidEmail,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.errorMessageFields).toHaveText('*Enter Valid Email');
  });

  test('validating Phone Number when the length of the field is less than the minimum', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userMinLengthNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.errorMessageFields).toHaveText('*Phone Number must be 10 digit');
  });

  test('validating Phone Number field exceeding the max allowed length', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userMaxLengthNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.errorMessageFields).toHaveText('*Phone Number must be 10 digit');
  });

  test('check that user cannot register with invalid phone number', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userInvalidEmail,
      dataSet.userPassword,
      dataSet.userPasswordConfirm
    );
    await expect(element.registrationPage.errorMessageFields).toContainText('*only numbers is allowed');
  });

  test('validating Password fields when the length of the fields is less than the minimum', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userMinLengthPassword,
      dataSet.userMinLengthPassword
    );
    await expect(element.registrationPage.allertMessage).toHaveText(' Password must be 8 Character Long! ');
  });

  test('check that user cannot register when entering password without special characters', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPasswordNoCharact,
      dataSet.userPasswordNoCharact
    );
    await expect(element.registrationPage.allertMessage).toHaveText(' Please enter 1 Special Character, 1 Capital 1, Numeric 1 Small ');
  });

  test('check that user cannot register when entering password without numbers', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPasswordNoNumb,
      dataSet.userPasswordNoNumb
    );
    await expect(element.registrationPage.allertMessage).toHaveText(' Please enter 1 Special Character, 1 Capital 1, Numeric 1 Small ');
  });

  test('check that user cannot register when entering password without capital letters', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPasswordNoCapitalSymb,
      dataSet.userPasswordNoCapitalSymb
    );
    await expect(element.registrationPage.allertMessage).toHaveText(' Please enter 1 Special Character, 1 Capital 1, Numeric 1 Small ');
  });

  test('check that user cannot register when password and password confirmation are different', async ({ page }) => {
    const element = new PageFactory(page);
    await element.registrationPage.registration(
      dataSet.userFirstName,
      dataSet.userLastName,
      dataSet.userEmail,
      dataSet.userPhoneNumber,
      dataSet.userPassword,
      dataSet.userPasswordConfirmInvalid
    );
    await expect(element.registrationPage.errorMessageFields).toHaveText('Password and Confirm Password must match with each other.');
  });
});

test.describe('Tests for checking log in', () => {
  test.beforeEach(async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.goTo();
  });

  test('check that user is successfully logged in from the login page', async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.userName.type(dataSet.username);
    await element.loginPage.password.type(dataSet.password);
    await element.loginPage.signInbutton.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash' );
  });

  test('check that user is successfully logged in from the register page', async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.registerLink.click();
    await element.registrationPage.loginButton.click();
    await element.loginPage.userName.type(dataSet.username);
    await element.loginPage.password.type(dataSet.password);
    await element.loginPage.signInbutton.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash');
  });

  test('check that the user cannot login with empty email', async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.password.type(dataSet.password);
    await element.loginPage.signInbutton.click();
    await expect(element.loginPage.errorMessage).toHaveText('*Email is required');
  });

  test('check that error message is displayed when entering incorrect format of email and valid password', async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.userName.type(dataSet.invalidUsername2);
    await element.loginPage.password.type(dataSet.password);
    await element.loginPage.signInbutton.click();
    await expect(element.loginPage.errorMessage).toHaveText('*Enter Valid Email');
  });

  test('check that the user cannot login with empty password', async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.userName.type(dataSet.username);
    await element.loginPage.signInbutton.click();
    await expect(element.loginPage.errorMessage).toHaveText('*Password is required');
  });

  test('check that the user cannot login with invalid email and valid password', async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.userName.type(dataSet.invalidUsername);
    await element.loginPage.password.type(dataSet.password);
    await element.loginPage.signInbutton.click();
    await expect(element.loginPage.allertMessage).toHaveText(' Incorrect email or password. ');
  });

  test('check that the user cannot login with invalid password and valid email', async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.userName.type(dataSet.username);
    await element.loginPage.password.type(dataSet.invalidPassword);
    await element.loginPage.signInbutton.click();
    await expect(element.loginPage.allertMessage).toHaveText(' Incorrect email or password. ');
  });

  test('check that the user cannot login with spaces before password and valid email', async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.userName.type(dataSet.username);
    await element.loginPage.password.type(dataSet.passwordWithSpacesBefore);
    await element.loginPage.signInbutton.click();
    await expect(element.loginPage.allertMessage).toHaveText(' Incorrect email or password. ');
  });

  test('check that the user cannot login with spaces after password and valid email', async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.userName.type(dataSet.username);
    await element.loginPage.password.type(dataSet.passwordWithSpacesAfter);
    await element.loginPage.signInbutton.click();
    await expect(element.loginPage.allertMessage).toHaveText(' Incorrect email or password. ');
  });

  test('check that the user cannot login with invalid email and password', async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.userName.type(dataSet.invalidUsername);
    await element.loginPage.password.type(dataSet.invalidPassword);
    await element.loginPage.signInbutton.click();
    await expect(element.loginPage.allertMessage).toHaveText(' Incorrect email or password. ');
  });
});

test.describe('Tests for checking forgot password feature', () => {
  test.beforeEach(async ({ page }) => {
    const element = new PageFactory(page);
    await element.loginPage.goTo();
    await element.loginPage.forgotPasswordLink.click();
  });

  test('check that new password is successfully saved', async ({ page }) => {
    const element = new PageFactory(page);
    await element.forgotPasswordPage.emailField.type(dataSet.userEmail);
    await element.forgotPasswordPage.passwordField.type(dataSet.newPassword);
    await element.forgotPasswordPage.confirmPasswordField.type(dataSet.newPassword);
    await element.forgotPasswordPage.savePasswordButton.click();
    await expect(element.loginPage.allertMessage).toHaveText('Password Changed Successfully');
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/auth/login');
  });

  test('check that user cannot save new password without filling in required fields', async ({ page }) => {
    const element = new PageFactory(page);
    await element.forgotPasswordPage.savePasswordButton.click();
    await expect(element.forgotPasswordPage.errorMessage.nth(0)).toContainText('is required');
    await expect(element.forgotPasswordPage.errorMessage.nth(1)).toContainText('is required');
    await expect(element.forgotPasswordPage.errorMessage.nth(2)).toContainText('is required');
  });

  test('check that non-existent user cannot save new password', async ({ page }) => {
    const element = new PageFactory(page);
    await element.forgotPasswordPage.emailField.type(dataSet.invalidUsername);
    await element.forgotPasswordPage.passwordField.type(dataSet.password);
    await element.forgotPasswordPage.confirmPasswordField.type(dataSet.password);
    await element.forgotPasswordPage.savePasswordButton.click();
    await expect(element.forgotPasswordPage.allertMessage).toHaveText(' User Not found. ');
  });

  test('check that user cannot save new password when password and password confirmation are different', async ({ page }) => {
    const element = new PageFactory(page);
    await element.forgotPasswordPage.emailField.type(dataSet.invalidUsername);
    await element.forgotPasswordPage.passwordField.type(dataSet.password);
    await element.forgotPasswordPage.confirmPasswordField.type(dataSet.invalidPassword);
    await element.forgotPasswordPage.savePasswordButton.click();
    await expect(element.forgotPasswordPage.errorMessage).toHaveText('Password and Confirm Password must match with each other.');
  });

  test('check that user is successfully logged in with new password after updating password', async ({ page }) => {
    const element = new PageFactory(page);
    await element.forgotPasswordPage.loginButton.click();
    await element.loginPage.userName.type(dataSet.username);
    await element.loginPage.password.type(dataSet.newPassword);
    await element.loginPage.signInbutton.click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash');
  });

  test('check that user cannot login with the old password', async ({ page }) => {
    const element = new PageFactory(page);
    await element.forgotPasswordPage.loginButton.click();
    await element.loginPage.userName.type(dataSet.username);
    await element.loginPage.password.type(dataSet.password);
    await element.loginPage.signInbutton.click();
    await expect(element.loginPage.allertMessage).toHaveText(' Incorrect email or password. ');
  });
});
