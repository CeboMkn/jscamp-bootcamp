import stl from './MostrandoNumResults.module.css'
import { useDocumentTitle } from "../hooks/global/useDocumentTitle";
import { DEFAULT_FILTERS } from '../config';

export function MostrandoNumRresults({ currentPage, jobs }) {

    useDocumentTitle(`Resultados ${jobs} | Página ${currentPage}`);

    return (
        <div className={stl.mosNumResults}>
            <p>Mostrando {(currentPage - 1) * DEFAULT_FILTERS.RESULTS_PER_PAGE + 1} - {Math.min(currentPage * DEFAULT_FILTERS.RESULTS_PER_PAGE, jobs)} de {jobs}
            </p>
        </div>
    )
}