export const THEME_STORAGE_KEY = 'yasser-portfolio-theme'

export function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

export function getPreferredTheme() {
  return readStoredTheme() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
}

export function applyTheme(theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  const styles = getComputedStyle(root)
  const color = styles.getPropertyValue('--color-canvas').trim()
  if (color) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', color)
  const ink = styles.getPropertyValue('--color-ink').trim()
  const brand = styles.getPropertyValue('--color-primary').trim()
  if (color && ink && brand) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="${color}"/><text x="7" y="45" font-family="Arial,sans-serif" font-size="35" font-weight="800" letter-spacing="-5" fill="${ink}">Y<tspan fill="${brand}">S</tspan></text></svg>`
    document.querySelector('link[rel="icon"]')?.setAttribute('href', `data:image/svg+xml,${encodeURIComponent(svg)}`)
  }
}
