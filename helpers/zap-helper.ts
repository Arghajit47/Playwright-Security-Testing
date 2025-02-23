import path from "path";
import ZapClient from "zaproxy";

export async function generateZAPReport(
  zapClient: ZapClient,
  title: string,
  template: any,
  description: string,
  filename: any
) {
  const maxRetries = 3;
  const retryDelay = 5000; // 5 seconds

  for (let i = 0; i < maxRetries; i++) {
    try {
      await zapClient.reports.generate(
        {
          title: title + "- Security Report",
          template: "traditional-html-plus",
          description: "Security Scan Report for the- " + description + " Page",
          reportfilename: `./Playwright-security-testing/security-report/${filename}.html`,
          display: false,
        },
        { timeout: 60000 }
      );
      console.log(`Report generated successfully: ${filename}.html`);
      return;
    } catch (err) {
      console.error(`Attempt ${i + 1} failed: ${err}`);
      if (i < maxRetries - 1) {
        await new Promise((r) => setTimeout(r, retryDelay));
      } else {
        throw err;
      }
    }
  }
}

export async function waitForZAP() {
  console.log("⚡ Waiting for ZAP to be ready...");
  let isReady = false;
  const maxRetries = 20;
  const retryDelay = 2000;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch("http://127.0.0.1:8080");
      if (response.ok) {
        isReady = true;
        console.log("ZAP is ready!");
        break;
      }
    } catch (e) {
      console.log(`🕐 ZAP not ready yet, retrying (${i + 1}/${maxRetries})...`);
      await new Promise((r) => setTimeout(r, retryDelay));
    }
  }

  if (!isReady) throw new Error("❌ ZAP did not start in time!");
}