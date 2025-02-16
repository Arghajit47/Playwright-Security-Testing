import path from "path";
import ZapClient from "zaproxy";

export function generateZAPReport(
  zapClient: ZapClient, // Accept ZAP client instance
  title: string,
  template: any,
  description: string,
  filename: any
) {
  zapClient.reports.generate({
    title: title + "- Security Report",
    template: "traditional-pdf",
    description: "Security Scan Report for the- " + description + " Page",
    reportfilename: `./Playwright-api-testing/security-report/${filename}.html`,
    display: false,
  });
}

export async function waitForZAP() {
  console.log("⚡ Waiting for ZAP to be ready...");
  let isReady = false;
  const maxRetries = 20; // Increase retries to 20
  const retryDelay = 2000; // Increase delay to 2 seconds

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch("http://127.0.0.1:8080");
      if (response.ok) {
        isReady = true;
        break;
      }
    } catch (e) {
      console.log(`🕐 ZAP not ready yet, retrying (${i + 1}/${maxRetries})...`);
      await new Promise((r) => setTimeout(r, retryDelay));
    }
  }

  if (!isReady) throw new Error("❌ ZAP did not start in time!");
}
