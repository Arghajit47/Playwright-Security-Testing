import { test, expect } from "@playwright/test";
import { ApiHelper } from "../helpers/api-helper";
import loginData from "../testData/loginUser.json";

test.describe.configure({ mode: "serial" });
let accessToken;

test.describe.serial("API Testing serialization", () => {
  const apiHelper = new ApiHelper();

  test("Login user and get tokens", async () => {
    const response = await apiHelper.postRequest(
      "https://dummyjson.com/auth/login",
      { "Content-Type": "application/json" },
      loginData
    );
    accessToken = await response.accessToken;
    console.log(response);
  });

  test("Get current auth user", async () => {
    console.log(accessToken);
    const response = await apiHelper.getRequest(
      "https://dummyjson.com/auth/me",
      { Authorization: `Bearer ${accessToken}` }
    );
    console.log(response);
    expect(await response.username).toEqual(loginData.username);
  });

  test("Refresh auth session", async () => {
    const response = await apiHelper.postRequest(
      "https://dummyjson.com/auth/refresh",
      { "Content-Type": "application/json" },
      { refreshToken: accessToken }
    );
    console.log(response);
    expect(await response).toHaveProperty("refreshToken");
    expect(await response).toHaveProperty("accessToken");
    expect(await response.refreshToken).not.toBeNull();
    expect(await response.accessToken).not.toBeNull();
  });

  test.skip("error API", async () => {
    const response = await apiHelper.getRequest(
      "https://dummyjson.com/http/404/Hello_Peter"
    );
  });
});

test.describe.serial("API Testing 'Carts' in dummyJSON", () => {
  const apiHelper = new ApiHelper();

  test("Get all carts", async () => {
    const response = await apiHelper.getRequest("https://dummyjson.com/carts");
    console.log(response);
  });

  test("Get a single cart", async () => {
    const response = await apiHelper.getRequest(
      "https://dummyjson.com/carts/1"
    );
    console.log(response);
  });

  test("Get carts by a user", async () => {
    const response = await apiHelper.getRequest(
      "https://dummyjson.com/carts/user/11"
    );
    console.log(response);
  });
});
