const { test, expect, request } = require('@playwright/test');



test.describe('API tests', async () => {
  const baseUrl = 'https://rahulshettyacademy.com';

  test('POST request: Creating new user', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/ecom/auth/register`, {
      data: {
        confirmPassword: 'Test123!!!!*',
        firstName: 'AnyFirstName',
        lastName: 'AnyLastName',
        required: true,
        userEmail: 'testmail@mail.com',
        userMobile: '1111111111',
        userPassword: 'Test123!!!!*',
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(responseBody).toBeTruthy();
    console.log(responseBody);
  });

  test('POST request: Creating an already existing user', async ({
    request,
  }) => {
    const response = await request.post(`${baseUrl}/api/ecom/auth/register`, {
      data: {
        confirmPassword: 'Test123!!!!*',
        firstName: 'AnyFirstName',
        lastName: 'AnyLastName',
        required: true,
        userEmail: 'testmail@mail.com',
        userMobile: '1111111111',
        userPassword: 'Test123!!!!*',
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(400);
    expect(responseBody.message).toBe(
      'User already exisits with this Email Id!'
    );
  });

  test('POST request: Login under created user', async ({ request }) => {
    const response = await request.post(`${baseUrl}/api/ecom/auth/login`, {
      data: {
        userEmail: 'testmail@mail.com',
        userPassword: 'Test123!!!!*',
      },
    });
    const responseBody = JSON.parse(await response.text());
    expect(response.status()).toBe(200);
    expect(responseBody.token).toBeTruthy();
  });

});
