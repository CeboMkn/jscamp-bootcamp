/* - Ejecutar test en powershell: $env:NODE_ENV="test"; node --test app.test.js */

import assert from 'node:assert'
import { after, before, describe, test } from 'node:test'

process.env.NODE_ENV = 'test'

const { default: app } = await import('./app.js')

let server
const PORT = 5678
const BASE_URL = `http://localhost:${PORT}`

// Tratamos de evitar IDs hardcodeados para modificar jobs
const seedJobId = 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57'
const invalidId = '00000000-0000-0000-0000-000000000000'

const jobValido = {
  titulo: 'Ingeniero DevOps',
  empresa: 'CeboMkn',
  ubicacion: 'Remoto',
  descripcion: 'Buscamos un ingeniero DevOps con experiencia en contenedores.',
  data: {
    technology: ['docker', 'kubernetes', 'aws'],
    modalidad: 'remoto',
    nivel: 'senior'
  },
  content: {
    description: 'Descripción larga del puesto...',
    responsibilities: 'Responsabilidades del puesto...',
    requirements: 'Requisitos del puesto...',
    about: 'Sobre la empresa...'
  }
}

// Como en muchos tests usamos fetch y comparaciones entre `status`. Lo mejor es crear un helper que unifique estas cosas y simplifique el código. 
// Siguiendo con este patrón, podemos hacer lo mismo con la función que tenemos debajo, `normalizePath` normaliza el path que se pasa por argumento 
// a nuestros helpers para que el desarrollador tenga la libertad de usar `/jobs` o `jobs` como path.
function normalizePath(path = '/') {
  return path.startsWith('/') ? path : `/${path}`
}

async function getRequestAndCheckStatus(path = '/', expectedStatus) {
  const res = await fetch(`${BASE_URL}${normalizePath(path)}`)
  assert.strictEqual(res.status, expectedStatus)
  const json = await res.json()
  return json
}

async function postRequestAndCheckStatus(path = '/', expectedStatus, body) {
  const res = await fetch(`${BASE_URL}${normalizePath(path)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  assert.strictEqual(res.status, expectedStatus)
  const json = await res.json()
  return json
}

async function putRequestAndCheckStatus(path = '/', expectedStatus, body) {
  const res = await fetch(`${BASE_URL}${normalizePath(path)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  assert.strictEqual(res.status, expectedStatus)
  return res
}

async function patchRequestAndCheckStatus(path = '/', expectedStatus, body) {
  const res = await fetch(`${BASE_URL}${normalizePath(path)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  assert.strictEqual(res.status, expectedStatus)
  return res
}

async function deleteRequestAndCheckStatus(path = '/', expectedStatus) {
  const res = await fetch(`${BASE_URL}${normalizePath(path)}`, { method: 'DELETE' })
  assert.strictEqual(res.status, expectedStatus)
  return res
}

async function createTestJob() {
  return await postRequestAndCheckStatus('jobs', 201, {
    ...jobValido,
    titulo: `Job de prueba ${crypto.randomUUID()}`
  })
}

before(async () => {
  await new Promise((resolve, reject) => {
    server = app.listen(PORT, () => resolve())
    server.on('error', reject)
  })
})

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()))
  })
})

describe('GET /jobs', () => {
  test('responde 200 y devuelve un array de trabajos', async () => {
    /* Implementamos nuestro helper para facilitar la lectura del código y reducir lineas */
    const json = await getRequestAndCheckStatus('jobs', 200)
    assert.ok(Array.isArray(json.data))
  })

  test('filtra trabajos por tecnología', async () => {
    const json = await getRequestAndCheckStatus('jobs?technology=react', 200)
    assert.ok(json.data.every(job => job.data.technology.some(t => t.toLowerCase().includes('react'))))
  })

  test('respeta el límite de resultados', async () => {
    const json = await getRequestAndCheckStatus('jobs?limit=2', 200)
    assert.strictEqual(json.limit, 2)
    assert.strictEqual(json.data.length, 2)
  })

  test('aplica offset correctamente', async () => {
    const json = await getRequestAndCheckStatus('jobs?offset=1', 200)
    assert.strictEqual(json.data[0].id, seedJobId)
  })
})

describe('POST /jobs', () => {
  test('crea un job con buen formato y devuelve 201', async () => {
    const json = await postRequestAndCheckStatus('/jobs', 201, jobValido)
    assert.ok(json.id)
    assert.deepStrictEqual({ ...json, id: undefined }, { ...jobValido, id: undefined }) // <- Agregamos un `ID` con valor `undefined` para que el `JSON.stringify` no genere un error. Esto es lo que hace que nuestro `deepStrictEqual` funcione.
  })

  test('valida titulo menor de 3 caracteres', async () => {
    await postRequestAndCheckStatus('/jobs', 400, { ...jobValido, titulo: 'ab' })
  })

  test('valida titulo mayor de 100 caracteres', async () => {
    await postRequestAndCheckStatus('/jobs', 400, { ...jobValido, titulo: 'a'.repeat(101) })
  })

  test('valida falta de titulo', async () => {
    const { titulo, ...resto } = jobValido
    await postRequestAndCheckStatus('/jobs', 400, resto)
  })

  test('valida titulo no string', async () => {
    await postRequestAndCheckStatus('/jobs', 400, { ...jobValido, titulo: 123 })
  })

  test('permite omitir descripcion opcional', async () => {
    const { descripcion, ...resto } = jobValido
    await postRequestAndCheckStatus('/jobs', 201, resto)
  })
})

describe('GET /jobs/:id', () => {
  test('devuelve el trabajo con el id especificado', async () => {
    const json = await getRequestAndCheckStatus(`/jobs/${seedJobId}`, 200)
    assert.strictEqual(json.id, seedJobId)
  })

  test('devuelve 404 cuando el id no existe', async () => {
    const json = await getRequestAndCheckStatus(`/jobs/${invalidId}`, 404)
    assert.ok(json.error)
  })
})

describe('PUT /jobs/:id', () => {
  const jobCompleto = {
    titulo: 'Título actualizado',
    empresa: 'Nueva Empresa',
    ubicacion: 'Madrid',
    descripcion: 'Descripción actualizada del puesto.',
    data: { technology: ['node', 'react'], modalidad: 'remoto', nivel: 'senior' },
    content: {
      description: 'Descripción...',
      responsibilities: 'Resp...',
      requirements: 'Req...',
      about: 'Sobre...'
    }
  }

  test('actualiza el trabajo y devuelve 204', async () => {
    // Para no actualizar jobs existentes (esto haría que pueda fallar otro test que use ese job), creamos uno nuevo y trabajamos sobre él. Esto verás que lo hacemos con PATCH y PUT.
    const created = await createTestJob()

    await putRequestAndCheckStatus(`/jobs/${created.id}`, 204, jobCompleto)

    const json = await getRequestAndCheckStatus(`/jobs/${created.id}`, 200)
    assert.deepStrictEqual(json, { id: created.id, ...jobCompleto })
  })

  test('devuelve 404 cuando el id no existe', async () => {
    await putRequestAndCheckStatus(`/jobs/${invalidId}`, 404, jobCompleto)
  })
})

describe('PATCH /jobs/:id', () => {
  test('actualiza solo los campos enviados y devuelve 204', async () => {
    const created = await createTestJob()

    const original = await getRequestAndCheckStatus(`/jobs/${created.id}`, 200)

    await patchRequestAndCheckStatus(`/jobs/${created.id}`, 204, { titulo: 'Título parcial', ubicacion: 'Barcelona' })

    const json = await getRequestAndCheckStatus(`/jobs/${created.id}`, 200)
    assert.strictEqual(json.titulo, 'Título parcial')
    assert.strictEqual(json.ubicacion, 'Barcelona')
    assert.strictEqual(json.empresa, original.empresa)
    assert.strictEqual(json.descripcion, original.descripcion)
    assert.deepStrictEqual(json.data, original.data)
    assert.deepStrictEqual(json.content, original.content)
  })

  test('devuelve 404 cuando el id no existe', async () => {
    await patchRequestAndCheckStatus(`/jobs/${invalidId}`, 404, { titulo: 'Título válido' })
  })
})

describe('DELETE /jobs/:id', () => {
  test('elimina el trabajo y devuelve 204', async () => {
    const created = await createTestJob()
    await deleteRequestAndCheckStatus(`/jobs/${created.id}`, 204)
    await getRequestAndCheckStatus(`/jobs/${created.id}`, 404)
  })

  test('devuelve 404 cuando el id no existe', async () => {
    await deleteRequestAndCheckStatus(`/jobs/${invalidId}`, 404)
  })
})