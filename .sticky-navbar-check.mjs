import { createRequire } from 'node:module'
import assert from 'node:assert/strict'

const require = createRequire(import.meta.url)
const { chromium } = require('C:/Users/yasser/ALAA ELDIEN PROJECT/ALAA-ELDIEN/node_modules/@playwright/test')
const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage()
  await page.route('https://fonts.googleapis.com/**', route => route.abort())
  await page.route('https://fonts.gstatic.com/**', route => route.abort())
  await page.goto('http://localhost:5173/projects', { waitUntil: 'commit' })
  await page.locator('#main-content').waitFor({ state: 'attached' })
  await page.locator('.logo-loader').waitFor({ state: 'detached', timeout: 10000 })
  for (const width of [375, 1366]) {
    await page.setViewportSize({ width, height: 700 })
    for (const theme of ['light', 'dark']) {
      if (await page.locator('html').getAttribute('data-theme') !== theme) {
        await page.getByRole('button', { name: new RegExp(`switch to ${theme}`, 'i') }).click()
      }
      await page.evaluate(() => window.scrollTo(0, 500))
      await page.waitForTimeout(200)
      const header = await page.locator('header').evaluate(element => ({ top: element.getBoundingClientRect().top, position: getComputedStyle(element).position, scrollY }))
      assert.equal(header.position, 'sticky')
      assert.ok(header.scrollY > 0, 'Page must scroll to verify sticky behavior')
      assert.ok(Math.abs(header.top) < 1, `Header moved off the top: ${JSON.stringify(header)}`)
      if (width === 375) {
        await page.getByRole('button', { name: 'Open navigation' }).click()
        const menu = page.getByRole('navigation', { name: 'Mobile navigation' })
        assert.ok(await menu.isVisible())
        const bounds = await menu.boundingBox()
        assert.ok(bounds.y >= 80 && bounds.y < 110)
        await page.keyboard.press('Escape')
        assert.equal(await menu.isVisible(), false)
      }
    }
  }
  console.log('Passed: navbar remains at top 0 while scrolling on mobile/desktop in both themes; mobile menu opens at the sticky header and closes with Escape.')
} finally {
  await browser.close()
}
