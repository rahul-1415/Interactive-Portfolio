import { expect, test } from '@playwright/test'

test('the experience loads without errors', async ({ page }) => {
  const pageErrors: string[] = []
  const consoleErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })

  await page.goto('/')

  await expect(page).toHaveTitle(/Rahul Babu/)
  await expect(page.locator('canvas')).toBeVisible({ timeout: 30_000 })
  await expect(page.getByRole('heading', { name: 'Rahul Babu' })).toBeVisible()

  // Let the scene render a few frames before judging errors
  await page.waitForTimeout(2_000)
  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])

  // Set sail: the game layer (bounty board, sea chart with treasure marks)
  // comes up with the voyage
  await page.getByRole('button', { name: /set sail/i }).click({ timeout: 30_000 })
  await expect(page.locator('.bounty-board')).toBeVisible({ timeout: 15_000 })
  await expect(page.locator('.bounty-board')).toContainText('Rookie of the East Blue')
  await expect(page.locator('.minimap')).toBeVisible()
  await expect(page.locator('.minimap-x')).toHaveCount(10)
  expect(pageErrors).toEqual([])
})

test('the ship’s log fallback serves all content without WebGL', async ({ page }) => {
  await page.goto('/log')
  await expect(page).toHaveTitle(/Ship.s Log/)
  await expect(page.locator('canvas')).toHaveCount(0)
  await expect(page.locator('.log-section')).toHaveCount(6)
  // Content is real, server-rendered (SEO surface)
  await expect(page.getByText('Friedman Vartolo')).toBeVisible()
  await expect(page.getByRole('link', { name: /résumé/i })).toBeVisible()
})

test('unknown routes show the themed 404', async ({ page }) => {
  const response = await page.goto('/no-such-cove')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: 'Here Be Bugs' })).toBeVisible()
})
