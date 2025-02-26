import path from "path";
import fs from "fs";
import ZapClient from "zaproxy";

export async function generateZAPReport(
  zapClient: ZapClient,
  title: string,
  template: any,
  description: string,
  filename: any
) {
  // Define the report directory and path
  const reportDir = path.join(__dirname, "reports");
  const reportPath = path.join(reportDir, `${filename}.html`);

  // Ensure the report directory exists
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  console.log(`🔍 Generating ZAP security report at: ${reportPath}`);

  try {
    // Generate the report
    const response = await zapClient.reports.generate(
      {
        title: title + "- Security Report", // Required
        template: template || "traditional-html-plus", // Required
        description: "Security Scan Report for the- " + description + " Page", // Optional
        reportFileName: `${filename}.html`, // Correct parameter name and value
        reportDir: reportDir, // Correct parameter name and value
        display: false, // Optional
      },
      { timeout: 60000 } // Timeout for the API call
    );

    console.log("✅ ZAP API Response:", response);
  } catch (e) {
    console.error("❌ Failed to generate ZAP report:", e);
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
