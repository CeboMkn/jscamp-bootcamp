import crypto from 'node:crypto'
import type { Job, CreateJobDTO, UpdateJobDTO, JobFilters } from '../types'
import { db } from '../db/database'

type Modality = Job['data']['modality']
type Level = Job['data']['level']

interface JobRow {
  id: string
  title: string
  company: string
  location: string
  description: string
  modality: Modality
  level: Level
  technologies: string | null
  content_id: string | null
  content_description: string | null
  responsibilities: string | null
  requirements: string | null
  about: string | null
}

const jobQuery = `
  SELECT j.id, j.title, j.company, j.location, j.description, j.modality, j.level,
         GROUP_CONCAT(jt.technology) AS technologies,
         jc.id AS content_id,
         jc.description AS content_description,
         jc.responsibilities, jc.requirements, jc.about
  FROM jobs j
  LEFT JOIN job_technologies jt ON jt.job_id = j.id
  LEFT JOIN job_content jc ON jc.job_id = j.id
`

function mapRowToJob(row: JobRow): Job {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    description: row.description,
    data: {
      technology: row.technologies ? row.technologies.split(',') : [],
      modality: row.modality,
      level: row.level,
    },
    ...(row.content_id
      ? {
        content: {
          description: row.content_description ?? '',
          responsibilities: row.responsibilities ?? '',
          requirements: row.requirements ?? '',
          about: row.about ?? '',
        },
      }
      : {}),
  }
}

export class JobModel {
  // Obtener todos los jobs con filtros opcionales
  static async getAll(filters?: JobFilters): Promise<Job[]> {
    const conditions: string[] = []
    const params: unknown[] = []

    if (filters?.tech) {
      conditions.push('j.id IN (SELECT job_id FROM job_technologies WHERE technology = ?)')
      params.push(filters.tech)
    }
    if (filters?.modality) {
      conditions.push('j.modality = ?')
      params.push(filters.modality)
    }
    if (filters?.level) {
      conditions.push('j.level = ?')
      params.push(filters.level)
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''
    const rows = db.prepare(`${jobQuery} ${where} GROUP BY j.id`).all(params) as JobRow[]

    return rows.map(mapRowToJob)
  }

  // Obtener un job por ID
  static async getById(id: string): Promise<Job | undefined> {
    const row = db.prepare(`${jobQuery} WHERE j.id = ? GROUP BY j.id`).get(id) as JobRow | undefined
    return row ? mapRowToJob(row) : undefined
  }

  // Crear un nuevo job
  static async create(input: CreateJobDTO): Promise<Job> {
    const id = crypto.randomUUID()
    const newJob: Job = { id, ...input }

    const insertJob = db.prepare(`
      INSERT INTO jobs (id, title, company, location, description, modality, level)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    const insertTechnology = db.prepare(`
      INSERT INTO job_technologies (job_id, technology)
      VALUES (?, ?)
    `)

    const insertContent = db.prepare(`
      INSERT INTO job_content (id, job_id, description, responsibilities, requirements, about)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    const transaction = db.transaction(() => {
      insertJob.run(
        id,
        newJob.title,
        newJob.company,
        newJob.location,
        newJob.description,
        newJob.data.modality,
        newJob.data.level
      )

      for (const technology of newJob.data.technology) {
        insertTechnology.run(id, technology)
      }

      if (newJob.content) {
        insertContent.run(
          crypto.randomUUID(),
          id,
          newJob.content.description,
          newJob.content.responsibilities,
          newJob.content.requirements,
          newJob.content.about
        )
      }
    })

    transaction()
    return newJob
  }


  // Eliminar un job
  static async delete(id: string): Promise<boolean> {
    const result = db.prepare('DELETE FROM jobs WHERE id = ?').run(id)
    return result.changes > 0
  }

  // Actualizar un job
  static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
    const current = await JobModel.getById(id)
    if (!current) return null

    const updatedJob: Job = {
      ...current,
      id,
      title: input.title ?? current.title,
      company: input.company ?? current.company,
      location: input.location ?? current.location,
      description: input.description ?? current.description,
      data: {
        technology: input.data?.technology ?? current.data.technology,
        modality: input.data?.modality ?? current.data.modality,
        level: input.data?.level ?? current.data.level,
      },
      content: input.content ?? current.content,
    }

    const updateJob = db.prepare(`
      UPDATE jobs
      SET title = ?, company = ?, location = ?, description = ?, modality = ?, level = ?
      WHERE id = ?
    `)

    const deleteTechnologies = db.prepare('DELETE FROM job_technologies WHERE job_id = ?')
    const insertTechnology = db.prepare(`
      INSERT INTO job_technologies (job_id, technology)
      VALUES (?, ?)
    `)

    const deleteContent = db.prepare('DELETE FROM job_content WHERE job_id = ?')
    const insertContent = db.prepare(`
      INSERT INTO job_content (id, job_id, description, responsibilities, requirements, about)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    const transaction = db.transaction(() => {
      updateJob.run(
        updatedJob.title,
        updatedJob.company,
        updatedJob.location,
        updatedJob.description,
        updatedJob.data.modality,
        updatedJob.data.level,
        id
      )

      deleteTechnologies.run(id)
      for (const technology of updatedJob.data.technology) {
        insertTechnology.run(id, technology)
      }

      deleteContent.run(id)
      if (updatedJob.content) {
        insertContent.run(
          crypto.randomUUID(),
          id,
          updatedJob.content.description,
          updatedJob.content.responsibilities,
          updatedJob.content.requirements,
          updatedJob.content.about
        )
      }
    })

    transaction()
    return updatedJob
  }
}
