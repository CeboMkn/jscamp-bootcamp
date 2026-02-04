import '../App.css'
import { JobListing } from '../components/JobListing.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { SearchFormSection } from '../components/SearchFormSection.jsx';
import { MostrandoNumRresults } from '../components/MostrandoNumResults.jsx';
import { useFilters } from '../hooks/search/useFilters.jsx';
import { useDocumentTitle } from '../hooks/global/useDocumentTitle.js';

export function SearchPage() {

  useDocumentTitle('Buscador')

  const RESULTS_PER_PAGE = 4

  const {
    loading,
    filters,
    currentPage,
    setCurrentPage,
    jobs,
    total,
    totalPages,
    handleFilters
  } = useFilters(RESULTS_PER_PAGE)

  return (
    <main className="main_estrecho">
      <div>

        <SearchFormSection onFilters={handleFilters} filters={filters} />

        <JobListing load={loading} jobsData={jobs} totalJobs={total} />

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

        <MostrandoNumRresults currentPage={currentPage} results={RESULTS_PER_PAGE} jobs={total} />

      </div>
    </main>
  );
}
