import { chromium } from "playwright";

const BASE_URL = process.env.APP_URL || "http://localhost:5173";
const OUT_DIR = process.env.OUT_DIR || "screenshots";
const API_URL = process.env.API_URL || "http://localhost:3000";

function sanitize(name) {
  return name.replace(/[^a-z0-9-_]+/gi, "_").toLowerCase();
}

async function screenshot(page, label) {
  const path = `${OUT_DIR}/${sanitize(label)}.png`;
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.waitForTimeout(700);
  await page.screenshot({ path, fullPage: true });
  return path;
}

async function createTempUser() {
  const rand = Math.floor(Math.random() * 1e9);
  const username = `shot${rand}`;
  const email = `${username}@ex.com`;
  const password = "Str0ngP@ssw0rd!!";

  const res = await fetch(`${API_URL}/api/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`signup failed (${res.status}): ${JSON.stringify(json)}`);
  }
  if (!json?.token) {
    throw new Error(`signup missing token: ${JSON.stringify(json)}`);
  }
  return json; // { email, username, token }
}

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const shots = [];

  // Home
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  shots.push(await screenshot(page, "01-home"));

  // Login page (no credentials known; capture screen)
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  shots.push(await screenshot(page, "02-login"));

  // Authenticated views: create temp user and inject into localStorage
  const tempUser = await createTempUser();
  await context.addInitScript((u) => {
    localStorage.setItem("user", JSON.stringify(u));
  }, tempUser);

  // Dashboard (logged-in)
  await page.goto(`${BASE_URL}/dashboard`, { waitUntil: "networkidle" });
  shots.push(await screenshot(page, "03-dashboard"));

  // Market
  await page.goto(`${BASE_URL}/market`, { waitUntil: "networkidle" });
  shots.push(await screenshot(page, "04-market"));

  await browser.close();

  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify(
      { ok: true, baseUrl: BASE_URL, apiUrl: API_URL, screenshots: shots },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(JSON.stringify({ ok: false, error: String(err?.message || err) }, null, 2));
  process.exit(1);
});

