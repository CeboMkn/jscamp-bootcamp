import { useEffect, useState } from "react";
import { DEFAULT_FILTERS } from "../../config.js";
import { saveFilters } from "./saveFiltersLocalStorage.js"
import { showToast } from "../global/toast/toast.js";

/* 
Siempre hay que evitar pasar setters a los custom hooks, eso los hace muy dependientes de otro hook o estado.
Si vemos `useFilters`, ese hook estaba creando los estados de jobs, total y loading, pero sus setters SOLO se usaban en el `useFetchJobs`. 
Esto nos da una pauta de que podemos extraer esos estados de `useFilters` y que `useFetchJobs` se encargue de pedir los datos y de actualizar los estados.
Ahora el hook no recibe setters y además devuelve la data que queremos.
Esto lo hace más limpio y más fácil de usar.
*/
export function useFetchJobs(currentPage, filters) {
    const resultPerPage = DEFAULT_FILTERS.RESULTS_PER_PAGE
    const [jobs, setJobs] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)

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

                const offset = (currentPage - 1) * resultPerPage
                params.append('limit', resultPerPage)
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
                showToast('Error al pedir los trabajos', 'error')
                console.log('Error al pedir los trabajos')

            } finally {

                setLoading(false)
            }
        }
        fetchJobs()
    }, [filters, currentPage])

    return {
        jobs, total, loading
    }
}