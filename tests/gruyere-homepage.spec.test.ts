import "dotenv/config";
import { test, chromium } from "@playwright/test";
import { generateZAPReport, waitForZAP } from "../helpers/zap-helper";
import ZapClient from "zaproxy";

const proxyUrl = "http://127.0.0.1:8080";
const zapOptions = {
  apiKey: process.env.ZAP_API_KEY,
  proxy: {
    host: "127.0.0.1",
    port: 8080,
  },
};

let zapClient: ZapClient;

test.describe("Airbnb Security Testing", () => {
  test.setTimeout(100_000); // 100 seconds

  test.beforeAll(async () => {
    await waitForZAP(); // Ensure ZAP is ready
    zapClient = new ZapClient(zapOptions);
  });

  test.beforeEach(async ({ page }) => {
    const browser = await chromium.launch({
      headless: true,
      proxy: { server: proxyUrl },
    });
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    page = await context.newPage();

    await page.goto("https://nextbnb-three.vercel.app/");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(5000);
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test("Airbnb Homepage test", async ({ page }) => {
    console.log("Running ZAP security test for the homepage...");
    await generateZAPReport(
      zapClient, // Pass the ZAP client instance
      "Home Page",
      "traditional-html-plus",
      "Home Page",
      "home"
    );
    console.log("ZAP security test completed.");
  });
});