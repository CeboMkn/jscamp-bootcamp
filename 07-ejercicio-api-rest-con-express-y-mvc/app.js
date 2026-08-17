import express from 'express'
import { DEFAULTS } from './config.js'
import { corsMiddleware } from './middlewares/cors.js'
import { jobsRouter } from './routes/jobs.js'

const PORT = DEFAULTS.PORT || 3000
const app = express()

app.use(express.json());
app.use(corsMiddleware()) // Es un detalle, pero faltó invocar el middleware de cors

app.get('/', (req, res) => {
    res.send('Servidor en marcha');
});
app.use('/jobs', jobsRouter)

app.listen(PORT, () => {
  console.log(`Servidor levantado en http://localhost:${PORT}`)
})
