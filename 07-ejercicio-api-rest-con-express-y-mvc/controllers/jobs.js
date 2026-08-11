/* Aquí debe ir la lógica de tu controlador */
import { JobsModel } from "../models/jobs.js";
import { DEFAULTS } from "../config.js";

const default_limit = DEFAULTS.LIMIT_PAGINATION;
const default_offset = DEFAULTS.LIMIT_OFFSET;

export class jobsController {

    static async getAllJobs(req, res) {
        const { offset = default_offset, limit = default_limit, text, technology, type, level } = req.query;
        const { paginatedJobs, total } = await JobsModel.getAll({ offset, limit, text, technology, type, level });
        return res.json({
            total: total,
            result: paginatedJobs.length,
            offset: Number(offset),
            limit: Number(limit),
            data: paginatedJobs
        });
    }
}