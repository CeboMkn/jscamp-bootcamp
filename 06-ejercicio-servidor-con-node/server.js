import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { uptime } from 'node:process';
import { json } from 'node:stream/consumers';

process.loadEnvFile()

const port = process.env.PORT || 3000

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

const server = createServer(async (req, res) => {

  const { url, method } = req;
  const [path, query] = url.split('?');
  const searchParams = new URLSearchParams(query);

  if (method === 'GET') {
    if (path === '/') {
      sendJson(res, 200, { message: 'Servidor operativo' });
      return
    }

    if (path === '/health') {
      sendJson(res, 200, { status: 'ok', uptime: uptime() });
      return
    }

    if (path === '/users') {
      const name = searchParams.get('name')?.toLowerCase();

      // Excelente! Vamos a aplicar algunas validaciones para los parámetros numéricos

      // Number.isIntegrer ya evalúa que el valor no sea NaN, Infinity o decimal.
      const isValid = (num) => Number.isInteger(num) && num >= 0
      
      const limit = Number(searchParams.get('limit')) || users.length;
      const offset = Number(searchParams.get('offset')) || 0;
      
      // Validamos limit t offser
      if(!isValid(limit) || !isValid(offset)) {
        return sendJson(res, 400, { error: 'Los parámetros "limit" y "offset" deben ser números enteros mayores o iguales a 0' });
      }

      const minAgeRaw = searchParams.get('minAge');
      const maxAgeRaw = searchParams.get('maxAge');
      const minAge = minAgeRaw ? Number(minAgeRaw) : null;
      const maxAge = maxAgeRaw ? Number(maxAgeRaw) : null;

      // Validamos minAge y maxAge con una variación. Solo vamos a pasar por el validador si minAge o maxAge existen como parámetro.
      if(minAge !== null && !isValid(minAge)) {
        return sendJson(res, 400, { error: 'El parámetro "minAge" debe ser un número entero mayor o igual a 0' });
      }
      if(maxAge !== null && !isValid(maxAge)) {
        return sendJson(res, 400, { error: 'El parámetro "maxAge" debe ser un número entero mayor o igual a 0' });
      }

      const paginatedUsers = users
        .filter(user => {
          if (name && !user.name.toLowerCase().includes(name)) return false;
          if (minAge !== null && user.age < minAge) return false;
          if (maxAge !== null && user.age > maxAge) return false;
          return true;
        })
        .slice(offset, offset + limit);

      sendJson(res, 200, paginatedUsers);
      return;
    }

  }

  if (method === 'POST') {
    if (path === '/users') {
      const body = await json(req);
      if (!body || !body.name || !body.age) {
        return sendJson(res, 400, { error: 'Los campos "name" y "age" son obligatorios' });
      }

      const newUser = {
        id: randomUUID(),
        name: body.name,
        age: body.age,
      };
      users.push(newUser);

      sendJson(res, 201, { message: 'Usuario creado correctamente', user: newUser });

    }
  }

  return sendJson(res, 404, { error: 'Ruta no encontrada' });

})

server.listen(port, () => {
  const address = server.address()
  console.log(`Servidor escuchando en http://localhost:${address.port}`)
})

const users = [
  {
    id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    name: 'Miguel',
    age: 28,
  },
  {
    id: 'f6e5d4c3-b2a1-4f5e-6d7c-8b9a0e1f2a3b',
    name: 'Mateo',
    age: 34,
  },
  {
    id: '9a8b7c6d-5e4f-4a3b-2c1d-0e9f8a7b6c5d',
    name: 'Pablo',
    age: 22,
  },
  {
    id: '3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f',
    name: 'Lucía',
    age: 31,
  },
  {
    id: '7b8c9d0e-1f2a-4b3c-4d5e-6f7a8b9c0d1e',
    name: 'Ana',
    age: 26,
  },
  {
    id: '5d6e7f8a-9b0c-4d1e-2f3a-4b5c6d7e8f9a',
    name: 'Juan',
    age: 29,
  },
  {
    id: '2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d',
    name: 'Sofía',
    age: 25,
  },
  {
    id: '8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c',
    name: 'Carlos',
    age: 37,
  },
  {
    id: '4c5d6e7f-8a9b-4c0d-1e2f-3a4b5c6d7e8f',
    name: 'Elena',
    age: 23,
  },
  {
    id: '0e1f2a3b-4c5d-4e6f-7a8b-9c0d1e2f3a4b',
    name: 'Diego',
    age: 30,
  },
]
