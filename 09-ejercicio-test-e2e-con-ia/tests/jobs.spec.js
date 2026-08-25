import { expect, test } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

test.setTimeout(60_000)

async function login(page) {
  await page.goto(`${BASE_URL}/login`)
  await page.getByRole('button', { name: 'Iniciar Sesión' }).click()
}

async function searchFromHome(page, term) {
  await page.goto(BASE_URL)
  // Evitemos siempre usar `locator`, el mejor getter que podemos usar es getByRole: por accesibilidad y manteniblidad
  await page.getByRole('searchbox', { name: 'Buscar empleos por título, habilidad o empresa' }).fill(term)
  await page.getByRole('button', { name: 'Buscar' }).click()
  // Los titulos los podemos obtener por medio de getByRole
  await expect(page.getByRole('heading', { level: 3 }).first()).toBeVisible()
}

async function openFirstResult(page) {
  await page.getByRole('heading', { level: 3 }).first().click()
  await expect(page).toHaveURL(/\/job\//)
}

test.describe('Navegación básica', () => {
  test('la página principal carga y muestra el buscador', async ({ page }) => {
    await page.goto(BASE_URL)
    await expect(page.getByRole('searchbox', { name: 'Buscar empleos por título, habilidad o empresa' })).toBeVisible()
  })
})

test.describe('Búsqueda de empleos', () => {
  test('busca "React" y muestra resultados', async ({ page }) => {
    await searchFromHome(page, 'React')
    await expect(page).toHaveURL(/text=React/)
    await expect(page.getByRole('heading', { level: 3 }).first()).toBeVisible()
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
    await page.getByRole('combobox', { name: 'Ubicación' }).selectOption('remoto')
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
    await page.getByRole('combobox', { name: 'Nivel de experiencia' }).selectOption('senior')
    await expect(page).toHaveURL(/level=senior/)
    await expect(page.getByRole('heading', { level: 3 }).first()).toBeVisible()
  })
})

test.describe('Paginación', () => {
  test('muestra paginación y navega a la siguiente página', async ({ page }) => {
    await page.goto(`${BASE_URL}/search`)

    const next = page.getByRole('link', { name: 'Siguiente' })
    await expect(next).toBeVisible()

    const firstResult = page.getByRole('heading', { level: 3 }).first()
    const titleBefore = await firstResult.textContent()

    await next.click()

    // Verificamod el cambio de página: se actualiza el contador y cambian los resultados
    await expect(page.getByText(/Mostrando 4 - 6 de/)).toBeVisible()
    await expect(firstResult).not.toHaveText(titleBefore)
  })
})

test.describe('Detalle de empleo', () => {
  test('muestra el detalle y permite aplicar', async ({ page }) => {
    await searchFromHome(page, 'JavaScript')
    await openFirstResult(page)

    await expect(page.getByRole('heading', { name: 'Descripción', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Requisitos', exact: true })).toBeVisible()

    await login(page)
    // Podemos usar `goBack` para volver a la página anterior
    await page.goBack()

    await page.getByRole('button', { name: 'Aplicar' }).first().click()
    await expect(page.getByRole('button', { name: 'Aplicado' }).first()).toBeVisible()
  })
})
