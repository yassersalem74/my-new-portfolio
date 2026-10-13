import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { chromium, expect } = require('C:/Users/yasser/ALAA ELDIEN PROJECT/ALAA-ELDIEN/node_modules/@playwright/test')
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const errors = []
const page = await browser.newPage()
page.on('pageerror', error => errors.push(error.message))
await page.route('https://formsubmit.co/**', route => route.abort())
const sizes = [[320, 740], [768, 1024], [1024, 768], [1280, 600], [1366, 768], [1440, 900], [1920, 1080]]
for (const theme of ['light', 'dark']) {
  await page.addInitScript(mode => localStorage.setItem('yasser-portfolio-theme', mode), theme)
  for (const [width, height] of sizes) {
    await page.setViewportSize({ width, height })
    await page.goto('http://127.0.0.1:5179/contact', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
    await expect(page.getByRole('heading', { name: 'Send Me a Message' })).toBeVisible()
    const geometry = await page.evaluate(() => {
      const section = document.querySelector('section[aria-labelledby="contact-heading"]')
      const top = section.querySelector('.page-container > .grid').getBoundingClientRect()
      const image = section.querySelector('img[alt^="Yasser Salem"]').parentElement.getBoundingClientRect()
      const form = document.querySelector('section[aria-labelledby="contact-form-heading"]').getBoundingClientRect()
      const fields = ['name', 'email', 'subject'].map(name => document.querySelector(`input[name="${name}"]`).getBoundingClientRect().top)
      const links = [...section.querySelectorAll('section[aria-labelledby="contact-socials-heading"] a')].map(a => ({ href: a.getAttribute('href'), target: a.target, right: a.getBoundingClientRect().right }))
      return { pageHeight: document.documentElement.scrollHeight, viewportHeight: innerHeight, pageWidth: document.documentElement.scrollWidth, viewportWidth: innerWidth, top: { x: top.x, width: top.width, bottom: top.bottom }, image: { x: image.x, height: image.height }, form: { x: form.x, width: form.width, top: form.top, bottom: form.bottom }, fields, links, textareaHeight: document.querySelector('textarea').getBoundingClientRect().height }
    })
    expect(geometry.pageWidth).toBeLessThanOrEqual(width)
    expect(geometry.links).toHaveLength(4)
    expect(geometry.links.find(link => link.href.startsWith('mailto:')).target).toBe('')
    expect(Math.abs(geometry.form.x - geometry.top.x)).toBeLessThan(1)
    expect(Math.abs(geometry.form.width - geometry.top.width)).toBeLessThan(1)
    expect(geometry.form.top).toBeGreaterThanOrEqual(geometry.top.bottom)
    if (width >= 1024) {
      expect(geometry.image.height).toBeLessThanOrEqual(360)
      expect(Math.max(...geometry.fields) - Math.min(...geometry.fields)).toBeLessThan(1)
      expect(Math.max(...geometry.links.map(link => link.right))).toBeLessThan(geometry.image.x)
    }
    console.log(JSON.stringify({ theme, width, height, scroll: geometry.pageHeight - height, ...geometry }))
    if ((width === 1366 && theme === 'light') || (width === 1920 && theme === 'dark') || (width === 320 && theme === 'light')) {
      await page.screenshot({ path: `.compact-contact-${width}-${theme}.png`, fullPage: true })
    }
  }
}
expect(errors).toEqual([])
await browser.close()
