import crypto from 'crypto'
import jobs from '../jobs.json' with { type: 'json' }

/* Aquí deberá ir la lógica de tu modelo */
/* Recuerda que el modelo SOLO debe manejar la lógica de los datos, en este caso nuestro JSON */

export class JobsModel {
    static async getAllJobs({ offset, limit, text, technology, type, level }) {
        const limitNumber = Number(limit)
        const offsetNumber = Number(offset)

        const paginatedJobs = jobs
            .filter(job => {
                if (text) {
                    const lowerText = text.toLowerCase()
                    if (!job.titulo.toLowerCase().includes(lowerText) && !job.content.description.toLowerCase().includes(lowerText)) {
                        return false
                    }
                }

                if (technology) {
                    const lowerTechnology = technology.toLowerCase();
                    if (!job.data.technology.some(tech => tech.toLowerCase().includes(lowerTechnology))) {
                        return false;
                    }
                }

                if (type) {
                    const lowerType = type.toLowerCase();
                    if (!job.data.modalidad.toLowerCase().includes(lowerType)) {
                        return false;
                    }
                }

                if (level) {
                    const lowerLevel = level.toLowerCase();
                    if (!job.data.nivel.toLowerCase().includes(lowerLevel)) {
                        return false;
                    }
                }

                return true;
            })

        const total = paginatedJobs.length;
        const slicedJobs = paginatedJobs.slice(offsetNumber, offsetNumber + limitNumber);

        return { paginatedJobs: slicedJobs, total };
    }

    static async getJobById(id) {
        const job = jobs.find(job => job.id === id);
        return job;
    }

    static async createJob({ titulo, empresa, ubicacion, descripcion, data, content }) {
        const newJob = {
            id: crypto.randomUUID(),
            titulo,
            empresa,
            ubicacion,
            descripcion,
            data,
            content
        };
        jobs.push(newJob);
        return newJob;
    }

    static async updateJob(id, { titulo, empresa, ubicacion, descripcion, data, content }) {
        const index = jobs.findIndex(job => job.id === id);

        if (index === -1) {
            return null;
        }

        const updatedJob = { ...jobs[index], titulo, empresa, ubicacion, descripcion, data, content };
        jobs[index] = updatedJob;

        return updatedJob;
    }

    static async patchJob({ id, input }) {
        const jobIndex = jobs.findIndex(job => job.id === id);

        if (jobIndex === -1) {
            return null;
        }

        const updatedJob = {
            ...jobs[jobIndex],
            ...input,
            id: jobs[jobIndex].id
        };

        jobs[jobIndex] = updatedJob;
        return updatedJob;
    }

    static async deleteJob(id) {
        const jobIndex = jobs.findIndex(job => job.id === id);

        if (jobIndex === -1) {
            return null;
        }

        const deletedJob = jobs.splice(jobIndex, 1)[0];
        return deletedJob;
    }

}