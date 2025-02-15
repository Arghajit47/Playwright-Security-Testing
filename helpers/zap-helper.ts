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
  for (let i = 0; i < 10; i++) {
    // Retry for ~10s
    try {
      const response = await fetch("http://localhost:8080/");
      if (response.ok) {
        isReady = true;
        break;
      }
    } catch (e) {
      console.log(`🕐 ZAP not ready yet, retrying (${i + 1}/10)...`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  if (!isReady) throw new Error("❌ ZAP did not start in time!");
}
