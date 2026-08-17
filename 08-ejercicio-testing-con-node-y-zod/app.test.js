/* - Ejecutar test en powershell: $env:NODE_ENV="test"; node --test app.test.js */

import { test, describe, before, after } from 'node:test'
import assert from 'node:assert'
import app from './app.js'

let server
const PORT = 5678
const BASE_URL = `http://localhost:${PORT}`

const id_get = 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57'
const id_put = 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57'
const id_patch = 'f62d8a34-923a-4ac2-9b0b-14e0ac2f5405'
const id_delete = 'a9f31a8e-ec38-4fd3-9114-88cc6d37a92b'

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
    const res = await fetch(`${BASE_URL}/jobs`)
    assert.strictEqual(res.status, 200)
    const json = await res.json()
    assert.ok(Array.isArray(json.data))
  })

  test('filtra trabajos por tecnología', async () => {
    const res = await fetch(`${BASE_URL}/jobs?technology=react`)
    assert.strictEqual(res.status, 200)
    const json = await res.json()
    assert.ok(json.data.every(job => job.data.technology.some(t => t.toLowerCase().includes('react'))))
  })

  test('respeta el límite de resultados', async () => {
    const res = await fetch(`${BASE_URL}/jobs?limit=2`)
    assert.strictEqual(res.status, 200)
    const json = await res.json()
    assert.strictEqual(json.limit, 2)
    assert.strictEqual(json.data.length, 2)
  })

  test('aplica offset correctamente', async () => {
    const res = await fetch(`${BASE_URL}/jobs?offset=1`)
    assert.strictEqual(res.status, 200)
    const json = await res.json()
    assert.strictEqual(json.data[0].id, id_get)
  })
})

describe('POST /jobs', () => {
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

  const post = (body) => fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  test('crea un job con buen formato y devuelve 201', async () => {
    const res = await post(jobValido)
    assert.strictEqual(res.status, 201)
    const json = await res.json()
    assert.ok(json.id)
    assert.strictEqual(json.titulo, jobValido.titulo)
    assert.strictEqual(json.empresa, jobValido.empresa)
  })

  test('valida titulo menor de 3 caracteres', async () => {
    const res = await post({ ...jobValido, titulo: 'ab' })
    assert.strictEqual(res.status, 400)
  })

  test('valida titulo mayor de 100 caracteres', async () => {
    const res = await post({ ...jobValido, titulo: 'a'.repeat(101) })
    assert.strictEqual(res.status, 400)
  })

  test('valida falta de titulo', async () => {
    const { titulo, ...resto } = jobValido
    const res = await post(resto)
    assert.strictEqual(res.status, 400)
  })

  test('valida titulo no string', async () => {
    const res = await post({ ...jobValido, titulo: 123 })
    assert.strictEqual(res.status, 400)
  })

  test('permite omitir descripcion opcional', async () => {
    const { descripcion, ...resto } = jobValido
    const res = await post(resto)
    assert.strictEqual(res.status, 201)
  })
})

describe('GET /jobs/:id', () => {
  test('devuelve el trabajo con el id especificado', async () => {
    const res = await fetch(`${BASE_URL}/jobs/${id_get}`)
    assert.strictEqual(res.status, 200)
    const json = await res.json()
    assert.strictEqual(json.id, id_get)
  })

  test('devuelve 404 cuando el id no existe', async () => {
    const res = await fetch(`${BASE_URL}/jobs/no-existe`)
    assert.strictEqual(res.status, 404)
    const json = await res.json()
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
    const res = await fetch(`${BASE_URL}/jobs/${id_put}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobCompleto)
    })
    assert.strictEqual(res.status, 204)

    const getRes = await fetch(`${BASE_URL}/jobs/${id_put}`)
    const json = await getRes.json()
    assert.strictEqual(json.titulo, jobCompleto.titulo)
  })

  test('devuelve 404 cuando el id no existe', async () => {
    const res = await fetch(`${BASE_URL}/jobs/no-existe`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobCompleto)
    })
    assert.strictEqual(res.status, 404)
  })
})

describe('PATCH /jobs/:id', () => {
  test('actualiza solo los campos enviados y devuelve 204', async () => {
    const res = await fetch(`${BASE_URL}/jobs/${id_patch}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: 'Título parcial', ubicacion: 'Barcelona' })
    })
    assert.strictEqual(res.status, 204)

    const getRes = await fetch(`${BASE_URL}/jobs/${id_patch}`)
    const json = await getRes.json()
    assert.strictEqual(json.titulo, 'Título parcial')
    assert.strictEqual(json.ubicacion, 'Barcelona')
    assert.strictEqual(json.empresa, 'Cloud Services SA')
  })

  test('devuelve 404 cuando el id no existe', async () => {
    const res = await fetch(`${BASE_URL}/jobs/no-existe`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo: 'Título válido' })
    })
    assert.strictEqual(res.status, 404)
  })
})

describe('DELETE /jobs/:id', () => {
  test('elimina el trabajo y devuelve 204', async () => {
    const res = await fetch(`${BASE_URL}/jobs/${id_delete}`, { method: 'DELETE' })
    assert.strictEqual(res.status, 204)

    const getRes = await fetch(`${BASE_URL}/jobs/${id_delete}`)
    assert.strictEqual(getRes.status, 404)
  })

  test('devuelve 404 cuando el id no existe', async () => {
    const res = await fetch(`${BASE_URL}/jobs/no-existe`, { method: 'DELETE' })
    assert.strictEqual(res.status, 404)
  })
})
