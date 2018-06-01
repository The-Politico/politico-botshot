const puppeteer = require('puppeteer');
const parsePadding = require('./padding');

const TIMEOUT = process.env.TIMEOUT || 15000;

async function takeScreenshot (url, selector, paddingString) {
  const padding = parsePadding(paddingString);

  let screenshot;
  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  });
  const page = await browser.newPage();

  page.setDefaultNavigationTimeout(TIMEOUT);
  page.setViewport({ width: 1000, height: 600, deviceScaleFactor: 2, });

  await page.goto(url, { waitUntil: 'networkidle2', });
  // Add a style tag to hide or remove elements...
  page.addStyleTag({
    content: `
      .screenshot-hide { visibility:hidden !important; }
      .screenshot-remove { display:none !important; }
    `,
  });

  const rect = await page.evaluate(selector => {
    // ... Also hide, remove or destroy individual elements for good measure.
    document.querySelectorAll('.screenshot-hide').forEach((el) => {
      el.style.visibility = 'hidden';
    });
    document.querySelectorAll('.screenshot-remove').forEach((el) => {
      el.style.display = 'none';
    });
    document.querySelectorAll('.screenshot-destroy').forEach((el) => {
      el.parentNode.removeChild(el);
    });

    const element = document.querySelector(selector);
    if (!element) {
      return null;
    }
    const { x, y, width, height, } = element.getBoundingClientRect();
    return { left: x, top: y, width, height, id: element.id, };
  }, selector);

  if (rect) {
    screenshot = await page.screenshot({
      clip: {
        x: rect.left - padding.left,
        y: rect.top - padding.top,
        width: rect.width + (padding.left + padding.right),
        height: rect.height + (padding.top + padding.bottom),
      },
    });
    console.log(`📸 Captured element ${selector}!`);
    console.log(`   >> ${url}`);
  } else {
    console.error(`🛑 Can't find element matching selector ${selector}`);
  }

  browser.close();
  return screenshot;
}

module.exports = takeScreenshot;
