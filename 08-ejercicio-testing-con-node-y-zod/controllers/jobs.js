/* Aquí debe ir la lógica de tu controlador */
import { DEFAULTS } from "../config.js";
import { JobsModel } from "../models/jobs.js";

const defaultLimit = DEFAULTS.LIMIT_PAGINATION;
const defaultOffset = DEFAULTS.LIMIT_OFFSET;

export class jobsController {

    static async getAllJobs(req, res) {
        const { offset = defaultOffset, limit = defaultLimit, text, technology, type, level } = req.query;
        const { paginatedJobs, total } = await JobsModel.getAllJobs({ offset, limit, text, technology, type, level });
        return res.status(200).json({
            total: total,
            result: paginatedJobs.length,
            offset: Number(offset),
            limit: Number(limit),
            data: paginatedJobs
        });
    }

    static async getJobById(req, res) {
        const { id } = req.params;
        const job = await JobsModel.getJobById(id);
        if (!job) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }
        return res.status(200).json(job);
    }

    static async createJob(req, res) {

        const { titulo, empresa, ubicacion, descripcion, data, content } = req.body;
        const newJob = await JobsModel.createJob({ titulo, empresa, ubicacion, descripcion, data, content });

        return res.status(201).json(newJob);

    }

    static async updateJob(req, res) {
        const { id } = req.params;
        const { titulo, empresa, ubicacion, descripcion, data, content } = req.body;
        const updatedJob = await JobsModel.updateJob(id, { titulo, empresa, ubicacion, descripcion, data, content });

        if (!updatedJob) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }

        return res.status(204).end();
    }

    static async patchJob(req, res) {
        const { id } = req.params;
        const input = req.body;

        const updatedJob = await JobsModel.patchJob({ id, input });

        if (!updatedJob) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }

        return res.status(204).end();
    }

    static async deleteJob(req, res) {
        const { id } = req.params;
        const deletedJob = await JobsModel.deleteJob(id);

        if (!deletedJob) {
            return res.status(404).json({ error: 'Trabajo no encontrado' });
        }

        return res.status(204).end();
    }

}