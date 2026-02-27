import { useDocumentTitle } from "../global/useDocumentTitle"


function parseText(text) {
    if (!text) return []
    return text
        .split('\n')
        .map(t => t.replace(/^- /, '').trim())
        .filter(Boolean)
}

export function useParseJob(job) {

    useDocumentTitle(job ? `${job.empresa} | ${job?.titulo}` : "Cargando empleo")

    if (!job?.content) {
        return { responsibilities: [], requirements: [] }
    }

    const responsibilities = parseText(job.content.responsibilities)

    const requirements = parseText(job.content.requirements)

    return { responsibilities, requirements }
}