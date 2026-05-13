import { useState } from 'react';
import { useFetchJobs } from './useFetchJobs';
import { DEFAULT_FILTERS } from '../../config';
import { useSearchParams } from 'react-router';

const resultsPerPage = DEFAULT_FILTERS.RESULTS_PER_PAGE

export const useFilters = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [searchParams] = useSearchParams()
    // Ahora que usamos react-router, los filtros vienen directamente de la URL
    const [filters, setToFilters] = useState(() => ({
        search: searchParams.get('text') || '',
        tecnologia: searchParams.get('technology') || '',
        ubicacion: searchParams.get('type') || '',
        nivel: searchParams.get('level') || ''
    }))

    const { jobs, loading, total } = useFetchJobs(currentPage, filters, resultsPerPage)

    const totalPages = Math.ceil(total / resultsPerPage)

    const handleFilters = (filtersAdd) => {
        setToFilters(filtersAdd)
        setCurrentPage(1)
    }

    /* Siempre evitemos devovler setters, lo que podemos hacer es crear una función agregando limitantes al comportamiento que queremos que tenga */
    const handleSetCurrentPage = (page) => {
        if (page < 1 || page > totalPages || page === currentPage) return
        setCurrentPage(page)
    }

    return {
        loading,
        filters,
        currentPage,
        handleSetCurrentPage,
        jobs,
        total,
        totalPages,
        handleFilters

    }
}

/* const getInitialFilters = () => {
    const readUrl = new URLSearchParams(window.location.search)
    console.log({ readUrl })
    if (readUrl.size > 2) {
        return {
            search: readUrl.get('text') || '',
            tecnologia: readUrl.get('technology') || '',
            ubicacion: readUrl.get('type') || '',
            nivel: readUrl.get('level') || ''
        }
    }

    const saved = localStorage.getItem('jobsFilters')
    if (!saved) {
        return {
            search: '',
            tecnologia: '',
            ubicacion: '',
            nivel: ''
        }
    }

    const params = new URLSearchParams(saved)
    return {
        search: params.get('text') || '',
        tecnologia: params.get('technology') || '',
        ubicacion: params.get('type') || '',
        nivel: params.get('level') || ''
    }
} */