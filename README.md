# 🔒 Playwright + OWASP ZAP Security Testing

![Playwright Logo](https://playwright.dev/img/playwright-logo.svg) ![OWASP ZAP Logo](https://www.angleritech.com/wp-content/uploads/2020/09/owasp-zap.png)

Welcome to the **Playwright + OWASP ZAP Security Testing** repository! This project combines the power of **Playwright** (for browser automation) and **OWASP ZAP** (for security testing) to help you identify vulnerabilities in your web applications. Whether you're a developer, QA engineer, or security enthusiast, this tool provides a seamless way to automate security testing.

---

## 🚀 Why Use This Tool?

- **Automated Security Testing**: Use Playwright to automate browser interactions and OWASP ZAP to perform security scans.
- **OWASP ZAP Integration**: Leverage ZAP's powerful security testing capabilities, including:
  - **Active Scanning**: Detect vulnerabilities like XSS, SQLi, and more.
  - **Passive Scanning**: Identify security issues without actively attacking the application.
- **Cross-Browser Support**: Test your application on multiple browsers (Chromium, Firefox, WebKit) using Playwright.
- **Customizable Workflow**: Easily extend and customize the testing workflow to fit your application's needs.

---

## 🛠️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Download and install the latest LTS version from [nodejs.org](https://nodejs.org/).
- **npm**: Comes pre-installed with Node.js.
- **OWASP ZAP**: Download and install ZAP from the [official website](https://www.zaproxy.org/download/).

To check if you have Node.js and npm installed, run:

```bash
node -v
npm -v
```

---

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Arghajit47/Playwright-Security-Testing.git
   cd Playwright-Security-Testing
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

   > **Note**: Use `npm ci` if you want to install the exact versions of dependencies specified in `package-lock.json`.

3. **Set Up OWASP ZAP**:
   - Ensure ZAP is installed and running.
   - Configure ZAP to allow API access (default API key is `your-zap-api-key`).

---

## 🏃 Running Tests

To run the security tests, follow these steps:

1. **Start OWASP ZAP**:
   - Launch ZAP and ensure it's running in daemon mode with API access enabled.

2. **Run Playwright Tests**:
   ```bash
   npx playwright test
   ```

   This will:
   - Automate browser interactions using Playwright.
   - Pass the URLs to OWASP ZAP for security scanning.

3. **View ZAP Results**:
   - Open the ZAP desktop application or access the ZAP API to view the security scan results.

---

## 🛠️ How It Works

This project uses **Playwright** to automate browser interactions and **OWASP ZAP** to perform security scans. Here's the workflow:

1. **Playwright Automation**:
   - Playwright navigates through your web application, simulating user interactions (e.g., clicking buttons, filling forms).
   - It captures the URLs visited during the session.

2. **OWASP ZAP Scanning**:
   - The captured URLs are passed to OWASP ZAP for security scanning.
   - ZAP performs both **active** and **passive** scans to identify vulnerabilities like XSS, SQLi, CSRF, and more.

3. **Reporting**:
   - ZAP generates a detailed report of the security issues found.
   - You can view the report in the ZAP desktop application or export it for further analysis.

---

## 🤝 Contributing

We welcome contributions to this project! If you'd like to contribute, please follow these steps:

1. **Fork the Repository**: Create a fork of this repository.
2. **Create a Branch**: Make your changes in a new branch.
3. **Submit a Pull Request**: Open a pull request with a detailed description of your changes.

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Playwright**: For providing an excellent browser automation framework.
- **OWASP ZAP**: For offering powerful security testing capabilities.
- **Open Source Community**: For inspiring and supporting this project.

---

## 📞 Contact

If you have any questions or suggestions, feel free to reach out:

- **GitHub**: [Arghajit47](https://github.com/Arghajit47)
- **Email**: [Email](mailto:arghajitsingha47@gmail.com)

---

Happy Testing! 🚀
