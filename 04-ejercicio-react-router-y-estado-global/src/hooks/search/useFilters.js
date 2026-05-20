import { useSearchParams } from 'react-router'
import { useState, useEffect } from 'react';
import { useFetchJobs } from './useFetchJobs';
import { DEFAULT_FILTERS } from '../../config';

export const useFilters = () => {
    const resultsPerPage = DEFAULT_FILTERS.RESULTS_PER_PAGE
    const [currentPage, setCurrentPage] = useState(1)
    const [searchParams] = useSearchParams()
    const [filters, setToFilters] = useState(getInitialFilters(searchParams))

    const { jobs, loading, total } = useFetchJobs(currentPage, filters)

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

    useEffect(() => {
        const urlFilters = {
            search: searchParams.get('text') || '',
            tecnologia: searchParams.get('technology') || '',
            ubicacion: searchParams.get('type') || '',
            nivel: searchParams.get('level') || ''
        }

        setToFilters(prev => {
            const noChange =
                prev.search === urlFilters.search &&
                prev.tecnologia === urlFilters.tecnologia &&
                prev.ubicacion === urlFilters.ubicacion &&
                prev.nivel === urlFilters.nivel
            return noChange ? prev : urlFilters
        })
    }, [searchParams])

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

const getInitialFilters = (searchParams) => {

    return {
        search: searchParams.get('text') || '',
        tecnologia: searchParams.get('technology') || '',
        ubicacion: searchParams.get('type') || '',
        nivel: searchParams.get('level') || ''
    }

}