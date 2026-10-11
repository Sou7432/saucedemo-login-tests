# AI-Generated Test Case Builder + Script Execution

Site under test: https://www.saucedemo.com (login functionality)
Tool stack: Playwright (JavaScript) with Page Object Model.

## 1. Requirement given to the AI
> "As a user I can log in to SauceDemo with a username and password. Valid credentials take me to the
> products page. Invalid, missing or locked-out credentials show a clear error message and keep me on the login page."

**Prompt used:** *"Act as a senior QA engineer. From the requirement above generate 5 login test cases covering
positive, negative, validation and business-rule scenarios. For each give ID, title, preconditions, steps, test data,
expected result and priority. Avoid duplicates."*

## 2. AI-generated test cases (reviewed and edited by me)

| ID | Title | Steps | Test data | Expected | Priority |
|----|-------|-------|-----------|----------|----------|
| TC-01 | Valid login | Open site, enter creds, click Login | standard_user / secret_sauce | Redirect to /inventory.html, "Products" heading, 6 items | High |
| TC-02 | Wrong password | Enter valid username + wrong password, Login | standard_user / wrong_password | Error "Username and password do not match any user in this service"; stays on login | High |
| TC-03 | Empty username | Leave username blank, enter password, Login | "" / secret_sauce | Error "Username is required" | Medium |
| TC-04 | Empty password | Enter username, leave password blank, Login | standard_user / "" | Error "Password is required" | Medium |
| TC-05 | Locked-out user | Login with locked account | locked_out_user / secret_sauce | Error "Sorry, this user has been locked out." | High |

## 3. How AI helped test design (reasoning)
- **Coverage:** I asked AI for scenarios by category (positive / negative / validation / business rule). It proposed
  extras I had not listed (locked-out user, each field empty separately rather than one "empty form" case).
- **Review, not copy-paste:** AI first suggested SQL-injection and very long input cases. I kept them as *future* ideas because the
  assignment asks for 5 core cases and the site is a demo app. I also corrected expected messages by checking the real site.
- **Prioritisation:** AI helped rank cases (valid login, wrong password, locked user = High) so the most valuable ones are automated first.
- **Test data:** The demo credentials shown on the login page were used; no real data.
- **Code:** I used AI for test *design*; locators, the Page Object structure and assertions were written/validated by me by running the tests.

## 4. Automated script
All 5 cases are automated: `tests/login.spec.js`, using `pages/LoginPage.js` (Page Object).

## 5. Execution steps
```bash
git clone <your-repo-url> && cd <repo>
npm install
npx playwright install chromium
npm test              # headless run
npm run test:headed   # watch the browser
npm run report        # open HTML report
```
Requires Node.js 18+.

## 6. Future improvements
Add SQL-injection/whitespace/case-sensitivity tests, logout test, CI via GitHub Actions.
