import { Router } from 'express'
import { jobsController } from "../controllers/jobs.js";
import { validateJob, validatePartialJob } from "../schemas/jobs.js";

export const jobsRouter = Router()

const validateJobMiddleware = (req, res, next) => {
  const { success, data, error } = validateJob(req.body)

  if (!success) {
    return res.status(400).json({ message: 'Datos de trabajo inválidos', errors: error.issues })
  }

  req.body = data
  next()
}

const validatePartialJobMiddleware = (req, res, next) => {
  const { success, data, error } = validatePartialJob(req.body)

  if (!success) {
    return res.status(400).json({ message: 'Datos de trabajo inválidos', errors: error.issues })
  }

  req.body = data
  next()
}

jobsRouter.get('/', jobsController.getAllJobs);
jobsRouter.get('/:id', jobsController.getJobById);

jobsRouter.post('/', validateJobMiddleware, jobsController.createJob);

jobsRouter.put('/:id', validateJobMiddleware, jobsController.updateJob);

jobsRouter.patch('/:id', validatePartialJobMiddleware, jobsController.patchJob);

jobsRouter.delete('/:id', jobsController.deleteJob);
