import { test, expect } from '@playwright/test'
import { initBeforeEach } from './initialization'

test.describe('login', () => {
  initBeforeEach()

  test('login and logout from the page', async ({ page }) => {
    await page.goto('/auth/login')

    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
    await page.getByLabel('Email Address *').fill('walcoorperation.2@gmail.com')
    await page.getByLabel('Password *').fill('abc123')
    await page.getByRole('button', { name: /sign in/i }).click()

    await expect(page.getByText('Welcome')).toBeVisible()

    await page.goto('/auth/logout')
    await expect(page.getByText('Signing Out')).toBeVisible()

    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()
    expect(page.url()).toContain('/auth/login')
  })
})
