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
})
