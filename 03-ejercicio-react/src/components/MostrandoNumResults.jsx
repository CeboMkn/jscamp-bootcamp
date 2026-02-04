import { useDocumentTitle } from "../hooks/global/useDocumentTitle";

export function MostrandoNumRresults({ currentPage, results, jobs }) {

    useDocumentTitle(`Resultados ${jobs} | Página ${currentPage}`);

    return (
        <div className="mos_num_results">
            <p>Mostrando {(currentPage - 1) * results + 1} - {Math.min(currentPage * results, jobs)} de {jobs}
            </p>
        </div>
    )
}