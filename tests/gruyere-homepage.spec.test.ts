import "dotenv/config";
import { test, chromium } from "@playwright/test";
import { generateZAPReport, waitForZAP } from "../helpers/zap-helper";
import ZapClient from "zaproxy";

const proxyUrl = "http://localhost:8080";
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

  test.beforeEach(async ({ page }) => {
    await waitForZAP(); // Ensure ZAP is ready
    zapClient = new ZapClient(zapOptions);

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

  test("Airbnb Homepage test", async ({ page }) => {
    await generateZAPReport(
      zapClient, // Pass the ZAP client instance
      "Home Page",
      "traditional-html-plus",
      "Home Page",
      "home"
    );
  });
});
