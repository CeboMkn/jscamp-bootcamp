import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

test.setTimeout(60_000)

async function login(page) {
  await page.goto(`${BASE_URL}/login`)
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click()
}

async function searchFromHome(page, term) {
  await page.goto(BASE_URL)
  await page.getByPlaceholder('Buscar empleos por título, habilidad o empresa').fill(term)
  await page.getByRole('button', { name: 'Buscar' }).click()
  await expect(page.locator('.title_job').first()).toBeVisible()
}

async function openFirstResult(page) {
  await page.locator('.title_job').first().click()
  await expect(page).toHaveURL(/\/job\//)
}

test.describe('Navegación básica', () => {
  test('la página principal carga y muestra el buscador', async ({ page }) => {
    await page.goto(BASE_URL)
    await expect(page.getByPlaceholder('Buscar empleos por título, habilidad o empresa')).toBeVisible()
  })
})

test.describe('Búsqueda de empleos', () => {
  test('busca "React" y muestra resultados', async ({ page }) => {
    await searchFromHome(page, 'React')
    await expect(page).toHaveURL(/text=React/)
    await expect(page.locator('.title_job').first()).toBeVisible()
  })
})

test.describe('Flujo completo', () => {
  test('busca, ve el detalle, inicia sesión y aplica', async ({ page }) => {
    await searchFromHome(page, 'JavaScript')
    await openFirstResult(page)
    await expect(page.getByRole('heading', { name: 'Descripción', exact: true })).toBeVisible()

    const detailUrl = page.url()

    await page.getByRole('banner').getByRole('link', { name: 'Iniciar Sesión' }).click()
    await expect(page).toHaveURL(/login/)

    await page.getByRole('button', { name: 'Iniciar Sesión' }).click()

    await page.goto(detailUrl)
    await page.getByRole('button', { name: 'Aplicar' }).first().click()
    await expect(page.getByRole('button', { name: 'Aplicado' }).first()).toBeVisible()
  })
})

test.describe('Filtros', () => {
  test('filtra por ubicación Remoto', async ({ page }) => {
    await page.goto(`${BASE_URL}/search`)
    await page.locator('select[name="ubicacion"]').selectOption('remoto')
    await expect(page).toHaveURL(/type=remoto/)

    const cards = page.locator('#jobs-listings li')
    await expect(cards.first()).toContainText('Remoto')

    const count = await cards.count()
    for (let i = 0; i < count; i++) {
      await expect(cards.nth(i)).toContainText('Remoto')
    }
  })

  test('filtra por nivel Senior', async ({ page }) => {
    await page.goto(`${BASE_URL}/search`)
    await page.locator('select[name="nivel"]').selectOption('senior')
    await expect(page).toHaveURL(/level=senior/)
    await expect(page.locator('.title_job').first()).toBeVisible()
  })
})

test.describe('Paginación', () => {
  test('muestra paginación y navega a la siguiente página', async ({ page }) => {
    await page.goto(`${BASE_URL}/search`)

    const pageTwo = page.getByRole('link', { name: '2', exact: true })
    await expect(pageTwo).toBeVisible()

    await pageTwo.click()
    await expect(page.getByText(/Mostrando 4 - 6 de/)).toBeVisible()
  })
})

test.describe('Detalle de empleo', () => {
  test('muestra el detalle y permite aplicar', async ({ page }) => {
    await searchFromHome(page, 'JavaScript')
    await openFirstResult(page)

    await expect(page.getByRole('heading', { name: 'Descripción', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Requisitos', exact: true })).toBeVisible()

    const detailUrl = page.url()
    await login(page)
    await page.goto(detailUrl)

    await page.getByRole('button', { name: 'Aplicar' }).first().click()
    await expect(page.getByRole('button', { name: 'Aplicado' }).first()).toBeVisible()
  })
})
