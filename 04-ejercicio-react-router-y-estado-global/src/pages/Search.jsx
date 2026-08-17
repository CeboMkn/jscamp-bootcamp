import { JobListing } from '../components/JobListing.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { SearchFormSection } from '../components/SearchFormSection.jsx';
import { MostrandoNumRresults } from '../components/MostrandoNumResults.jsx';
import { useFilters } from '../hooks/search/useFilters.js';
import { useDocumentTitle } from '../hooks/global/useDocumentTitle.js';

export default function SearchPage() {

  useDocumentTitle('Buscador')

  const {
    loading,
    filters,
    currentPage,
    handleSetCurrentPage,
    jobs,
    total,
    totalPages,
    handleFilters
  } = useFilters()

  return (
    <main className="main_estrecho">
      <div>

        <SearchFormSection onFilters={handleFilters} filters={filters} />

        <JobListing load={loading} jobsData={jobs} totalJobs={total} />

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleSetCurrentPage} />

        <MostrandoNumRresults currentPage={currentPage} jobs={total} />

      </div>
    </main>
  );
}
