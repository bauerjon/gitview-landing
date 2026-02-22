import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import process from "node:process";

import { chromium } from "playwright";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const ROOT = process.cwd();
const ARTIFACTS = path.join(ROOT, ".artifacts", "visual");

const DEFAULTS = {
  urlLocal: "http://localhost:3000/",
  urlVercel: "https://vercel.com/",
  viewport: { width: 1440, height: 900 },
  colorScheme: "light",
};

function parseArgs(argv) {
  const args = { ...DEFAULTS, fullPage: false, deviceScaleFactor: 1 };
  for (let i = 2; i < argv.length; i++) {
    const token = argv[i];
    if (token === "--") continue;
    if (token === "--local") args.urlLocal = argv[++i];
    else if (token === "--vercel") args.urlVercel = argv[++i];
    else if (token === "--full-page") args.fullPage = true;
    else if (token === "--dpr") args.deviceScaleFactor = Number(argv[++i]);
    else if (token === "--width") args.viewport.width = Number(argv[++i]);
    else if (token === "--height") args.viewport.height = Number(argv[++i]);
    else if (token === "--scheme") args.colorScheme = argv[++i];
  }
  return args;
}

async function waitForHttpOk(url, timeoutMs = 30_000) {
  const start = Date.now();
  while (true) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (res.ok) return;
    } catch {
      // ignore
    }
    if (Date.now() - start > timeoutMs) {
      throw new Error(`Timed out waiting for ${url}`);
    }
    await new Promise((r) => setTimeout(r, 250));
  }
}

function startDevServer() {
  const child = spawn("pnpm", ["dev", "--port", "3000"], {
    cwd: ROOT,
    stdio: "pipe",
    env: { ...process.env, BROWSER: "none" },
  });

  let exited = false;
  child.on("exit", () => {
    exited = true;
  });

  const stop = async () => {
    if (exited) return;
    child.kill("SIGTERM");
    await new Promise((r) => setTimeout(r, 500));
    if (!exited) child.kill("SIGKILL");
  };

  return { child, stop };
}

async function capturePng({ page, filePath, fullPage }) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after { transition: none !important; animation: none !important; }
      html { scroll-behavior: auto !important; }
      nextjs-portal { display: none !important; }
      [data-visual-ignore] { display: none !important; }
    `,
  });

  await page.evaluate(() => {
    for (const svg of document.querySelectorAll("svg")) {
      try {
        svg.pauseAnimations?.();
        svg.setCurrentTime?.(0);
      } catch {
        // ignore
      }
    }
  });

  if (fullPage) {
    const viewportHeight = page.viewportSize()?.height ?? 800;
    await page.evaluate(async (step) => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      let lastScrollHeight = 0;

      for (let i = 0; i < 80; i++) {
        const scrollHeight = document.body.scrollHeight;
        const maxY = Math.max(0, scrollHeight - window.innerHeight);

        if (scrollHeight === lastScrollHeight && window.scrollY >= maxY) break;
        lastScrollHeight = scrollHeight;

        window.scrollBy(0, step);
        await sleep(140);
      }

      window.scrollTo(0, 0);
      await sleep(200);
    }, Math.floor(viewportHeight * 0.85));
  }

  await page.waitForTimeout(500);
  await page.screenshot({ path: filePath, fullPage });
}

async function waitForVercelStable(page) {
  const heading = page.getByRole("heading", {
    name: /Build and deploy on the AI Cloud/i,
  });
  await heading.waitFor({ state: "visible", timeout: 15_000 }).catch(() => {});

  const signUp = page
    .locator("a,button")
    .filter({ hasText: /^Sign Up$/i })
    .first();
  await signUp.waitFor({ state: "visible", timeout: 12_000 }).catch(() => {});

  await page.waitForTimeout(1500);
}

async function diffPng(aPath, bPath, outPath, { background } = {}) {
  const a = PNG.sync.read(await fs.readFile(aPath));
  const b = PNG.sync.read(await fs.readFile(bPath));

  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);

  const fill = background ?? { r: 255, g: 255, b: 255, a: 255 };
  const aCanvas = new PNG({ width, height, fill: true });
  const bCanvas = new PNG({ width, height, fill: true });

  for (let i = 0; i < aCanvas.data.length; i += 4) {
    aCanvas.data[i] = fill.r;
    aCanvas.data[i + 1] = fill.g;
    aCanvas.data[i + 2] = fill.b;
    aCanvas.data[i + 3] = fill.a;

    bCanvas.data[i] = fill.r;
    bCanvas.data[i + 1] = fill.g;
    bCanvas.data[i + 2] = fill.b;
    bCanvas.data[i + 3] = fill.a;
  }

  PNG.bitblt(a, aCanvas, 0, 0, a.width, a.height, 0, 0);
  PNG.bitblt(b, bCanvas, 0, 0, b.width, b.height, 0, 0);

  const diff = new PNG({ width, height });
  const pixels = pixelmatch(
    aCanvas.data,
    bCanvas.data,
    diff.data,
    width,
    height,
    { threshold: 0.1, includeAA: false }
  );

  await fs.writeFile(outPath, PNG.sync.write(diff));
  return pixels;
}

async function main() {
  const opts = parseArgs(process.argv);

  await fs.mkdir(ARTIFACTS, { recursive: true });
  const tag = `${opts.viewport.width}x${opts.viewport.height}@${opts.deviceScaleFactor}x-${opts.colorScheme}`;
  const dir = path.join(ARTIFACTS, tag);
  await fs.mkdir(dir, { recursive: true });

  const localPng = path.join(dir, "local.png");
  const vercelPng = path.join(dir, "vercel.png");
  const diffPngPath = path.join(dir, "diff.png");

  const server = startDevServer();
  try {
    await waitForHttpOk(opts.urlLocal);

    const browser = await chromium.launch();
    try {
      const context = await browser.newContext({
        viewport: opts.viewport,
        deviceScaleFactor: opts.deviceScaleFactor,
        colorScheme: opts.colorScheme,
      });

      const pageLocal = await context.newPage();
      await pageLocal.goto(opts.urlLocal, { waitUntil: "networkidle" });
      await capturePng({ page: pageLocal, filePath: localPng, fullPage: opts.fullPage });

      const pageVercel = await context.newPage();
      await pageVercel.goto(opts.urlVercel, { waitUntil: "domcontentloaded" });
      await waitForVercelStable(pageVercel);
      await capturePng({ page: pageVercel, filePath: vercelPng, fullPage: opts.fullPage });

      const background = opts.colorScheme === "dark"
        ? { r: 0, g: 0, b: 0, a: 255 }
        : { r: 255, g: 255, b: 255, a: 255 };
      const pixels = await diffPng(localPng, vercelPng, diffPngPath, { background });
      console.log(JSON.stringify({ dir, localPng, vercelPng, diffPng: diffPngPath, pixels }, null, 2));
    } finally {
      await browser.close();
    }
  } finally {
    await server.stop();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
