import { useDocumentTitle } from "../hooks/global/useDocumentTitle";
import { DEFAULT_FILTERS } from "../config";

export function MostrandoNumRresults({ currentPage, jobs }) {
    const resultsPerPage = DEFAULT_FILTERS.RESULTS_PER_PAGE

    useDocumentTitle(`Resultados ${jobs} | Página ${currentPage}`);

    return (
        <div className="mos_num_results">
            <p>Mostrando {(currentPage - 1) * resultsPerPage + 1} - {Math.min(currentPage * resultsPerPage, jobs)} de {jobs}
            </p>
        </div>
    )
}