const puppeteer = require('puppeteer');

const TIMEOUT = process.env.TIMEOUT || 5000;

async function takeScreenshot (url, selector, padding = 0) {
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

  const rect = await page.evaluate(selector => {
    // Hide or remove elements from page on screenshot
    document.querySelectorAll('.screenshot-hide').forEach((el) => {
      el.style.visibility = 'hidden';
    });
    document.querySelectorAll('.screenshot-remove').forEach((el) => {
      el.style.display = 'none';
    });
    // Temporary for our elections pages
    document.querySelectorAll('.live-analysis').forEach((el) => {
      el.style.display = 'none';
    });
    document.querySelectorAll('iframe').forEach((el) => {
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
        x: rect.left - padding,
        y: rect.top - padding,
        width: rect.width + (padding * 2),
        height: rect.height + (padding * 2),
      },
    });
    console.log(`📸 ${url} => ${selector}`);
  } else {
    console.error(`💥 Can not find selector ${selector}`);
  }

  browser.close();
  return screenshot;
}

module.exports = takeScreenshot;
