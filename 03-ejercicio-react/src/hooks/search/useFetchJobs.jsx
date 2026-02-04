import { useEffect } from "react";
import { saveFilters } from "./saveFiltersLocalStorage.jsx"

export function useFetchJobs(setJobs, setTotal, setLoading, currentPage, filters, RESULTS_PER_PAGE) {

    useEffect(() => {
        async function fetchJobs() {
            /* const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms)) */
            try {
                setLoading(true)

                /* await sleep(500) */
                const params = new URLSearchParams()
                if (filters.search) params.append('text', filters.search)
                if (filters.tecnologia) params.append('technology', filters.tecnologia)
                if (filters.ubicacion) params.append('type', filters.ubicacion)
                if (filters.nivel) params.append('level', filters.nivel)

                const offset = (currentPage - 1) * RESULTS_PER_PAGE
                params.append('limit', RESULTS_PER_PAGE)
                params.append('offset', offset)

                const queryParams = params.toString()
                const name = 'jobsFilters'
                window.history.pushState({}, '', `${window.location.pathname}?${queryParams}`)
                saveFilters(name, queryParams)

                const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`)

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`)
                }

                const json = await response.json()

                setJobs(json.data)
                setTotal(json.total)

            } catch (error) {

                console.log('Error al pedir los trabajos')

            } finally {

                setLoading(false)

            }
        }
        fetchJobs()
    }, [filters, currentPage])
}