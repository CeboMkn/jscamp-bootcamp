import express from 'express'
import { jobsRouter } from './routes/jobs.js'
import { DEFAULTS } from './config.js'
import { corsMiddleware } from './middlewares/cors.js'

const PORT = DEFAULTS.PORT || process.env.PORT
const app = express()

app.use(corsMiddleware())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor en marcha');
});
app.use('/jobs', jobsRouter)

if (!process.env.NODE_ENV) {
  app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
  })
}


export default app