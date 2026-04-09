import puppeteer from "puppeteer";
import { mkdir } from "fs/promises";

const PROMO_DIR = "./promo";
await mkdir(PROMO_DIR, { recursive: true });

// Try common dev server ports
const ports = [5173, 5174, 3000];
let url;
for (const port of ports) {
  try {
    const res = await fetch(`http://localhost:${port}`);
    if (res.ok) {
      url = `http://localhost:${port}`;
      break;
    }
  } catch {}
}

if (!url) {
  // Fall back to loading the built dist/index.html directly
  url = `file://${process.cwd()}/dist/index.html`;
}

console.log(`Using: ${url}`);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox"],
});

const screenshots = [
  { name: "screenshot-1280x800", width: 1280, height: 800 },
  { name: "screenshot-640x400", width: 640, height: 400 },
  { name: "small-promo-440x280", width: 440, height: 280 },
  { name: "large-promo-920x680", width: 920, height: 680 },
  { name: "marquee-1400x560", width: 1400, height: 560 },
];

for (const shot of screenshots) {
  const page = await browser.newPage();
  await page.setViewport({ width: shot.width, height: shot.height });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });
  // Wait a bit for animations to settle
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({
    path: `${PROMO_DIR}/${shot.name}.png`,
    fullPage: false,
  });
  console.log(`✓ ${shot.name}.png (${shot.width}×${shot.height})`);
  await page.close();
}

await browser.close();
console.log(`\nDone! Screenshots saved to ${PROMO_DIR}/`);
