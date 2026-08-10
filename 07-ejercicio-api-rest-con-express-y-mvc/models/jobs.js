import jobs from '../jobs.json' with { type: 'json' }
import fs from 'fs'

/* Aquí deberá ir la lógica de tu modelo */
/* Recuerda que el modelo SOLO debe manejar la lógica de los datos, en este caso nuestro JSON */

/* const jobs = JSON.parse(fs.readFileSync(new URL('../jobs.json', import.meta.url), 'utf-8')) */

export class JobsModel {
    static async getAll({ offset = 0, limit = 10, text, technology, type, level }) {
        const limitNumber = Number(limit)
        const offsetNumber = Number(offset)

        const paginatedJobs = jobs
            .filter(job => {
                if (text) {
                    const lowerText = text.toLowerCase()
                    if (!job.titulo.toLowerCase().includes(lowerText) && !job.descripcion.toLowerCase().includes(lowerText)) {
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
}