import * as z from 'zod'

const jobSchema = z.object({
  titulo: z.string({ error: 'El título es obligatorio' }).min(3, 'El título debe tener al menos 3 caracteres').max(100, 'Máximo 100 caracteres'),
  empresa: z.string({ error: 'La empresa es obligatoria' }),
  ubicacion: z.string({ error: 'La ubicación es obligatoria' }),
  descripcion: z.string().optional(),
  data: z.object({
    technology: z.array(z.string()),
    modalidad: z.string().optional(),
    nivel: z.string().optional(),
  }),
  content: z.object({
    description: z.string().optional(),
    responsibilities: z.string().optional(),
    requirements: z.string().optional(),
    about: z.string().optional(),
  }).optional()
})

export function validateJob(input) {
  return jobSchema.safeParse(input)
}

export function validatePartialJob(input) {
  return jobSchema.partial().safeParse(input)
}