/* Aquí debe ir la lógica de tu controlador */
import { JobsModel } from "../models/jobs.js";

export class jobsController {

    static async getAllJobs(req, res) {
        const { offset = 0, limit = 10, text, technology, type, level } = req.query;
        const { paginatedJobs, total } = await JobsModel.getAllJobs({ offset, limit, text, technology, type, level });
        return res.json({
            total: total,
            result: paginatedJobs.length,
            offset: Number(offset),
            limit: Number(limit),
            data: paginatedJobs
        });
    }
}