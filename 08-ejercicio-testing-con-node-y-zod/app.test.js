/*
 * Aquí debes escribir tus tests para la API de jobs
 *
 * Recuerda:
 * - Usar node:test y node:assert (sin dependencias externas)
 * - Levantar el servidor con before() y cerrarlo con after()
 * - Testear todos los endpoints: GET, POST, PUT, PATCH, DELETE
 * - Verificar validaciones con Zod
 * - Comprobar códigos de estado HTTP correctos
 * - Ejecutar test: $env:NODE_ENV="test"; node --test app.test.js
 */

import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import app from './app.js'

let server
const PORT = 3456
const BASE_URL = `http://localhost:${PORT}`
const id_job = 'd35b2c89-5d60-4f26-b19a-6cfb2f1a0f57' // ID de un trabajo existente para pruebas

// Levantar el servidor antes de ejecutar los tests

before(async () => {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => resolve())
        server.on('error', reject)
    })
})

// Cerrar el servidor después de ejecutar los tests

after(async () => {
    return new Promise((resolve, reject) => {
        server.close((err) => {
            if (err) return reject(err)
            resolve()
        })
    })
})

describe('GET /jobs', () => {
    test('Debería devolver un array de trabajos', async () => {
        const response = await fetch(`${BASE_URL}/jobs`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()
        assert.ok(Array.isArray(json.data), 'La respuesta debería ser un array')
    })

    test('Debe filtrar los trabajos por tecnología', async () => {
        const technology = 'JavaScript'
        const response = await fetch(`${BASE_URL}/jobs?technology=${technology}`)
        assert.strictEqual(response.status, 200)

        const json = await response.json()

        assert.ok(
            json.data.every(job => job.data.technology.some(t => t.toLowerCase() === technology.toLowerCase())),
            `Todos los trabajos deberían tener la tecnología ${technology}`
        )
    })

    test('Debería devolver un trabajo por ID', async () => {
        const response = await fetch(`${BASE_URL}/jobs/${id_job}`)
        const json = await response.json()
        assert.strictEqual(response.status, 200)
        assert.strictEqual(json.id, id_job)
    })

    test('Debería devolver 404 si el trabajo no existe', async () => {
        const response = await fetch(`${BASE_URL}/jobs/nonexistent-id`)
        assert.strictEqual(response.status, 404)
        const json = await response.json()
        assert.strictEqual(json.message, 'Trabajo no encontrado')
    })
})


