import { test, expect } from '@playwright/test'
import { initBeforeEach } from './initialization'

test.describe('about', () => {
  initBeforeEach()

  test('root navigates to about', async ({ page }) => {
    await page.goto('/auth')

    await expect(page).toHaveTitle('Webpack App')
    await expect(page.getByText('About')).toBeVisible()
  })

  test('navigation of /about', async ({ page }) => {
    await page.goto('/auth/about')

    await expect(page).toHaveTitle('Webpack App')
    await expect(page.getByText('About')).toBeVisible()
  })
})
