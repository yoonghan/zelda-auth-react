import { test } from '@playwright/test'

/**
 * Auth connects to rxjs and shared context.
 * Requires:
 *  1. Run and start:standalone or else the module can only be access from SPA shell
 *  2. Requires rxJS and external modules to operate.
 */

export const initBeforeEach = () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: '{···}' }).click()

    await page.getByRole('button', { name: 'Add new module' }).click()
    await page.getByLabel('Module Name:').fill('@walcron/zelda-shared-context')
    await page
      .getByLabel('Override URL:')
      .fill('https://zelda-shared.walcron.com/walcron-zelda-shared-context.js')
    await page.getByRole('button', { name: 'Apply override' }).click()

    await page.getByRole('button', { name: 'Add new module' }).click()
    await page.getByLabel('Module Name:').fill('rxjs')
    await page
      .getByLabel('Override URL:')
      .fill(
        'https://cdn.jsdelivr.net/npm/@esm-bundle/rxjs/system/es2015/rxjs.min.js'
      )
    await page.getByRole('button', { name: 'Apply override' }).click()
  })
}
