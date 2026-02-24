import '../App.css'
import { JobListing } from '../components/JobListing.jsx';
import { Pagination } from '../components/Pagination.jsx';
import { SearchFormSection } from '../components/SearchFormSection.jsx';
import { MostrandoNumRresults } from '../components/MostrandoNumResults.jsx';
import { useFilters } from '../hooks/search/useFilters.jsx';
import { useDocumentTitle } from '../hooks/global/useDocumentTitle.js';

/* No está mal dejarlo dentro del cuerpo del componente, pero todo lo que sean constantes inmutables, está bueno que estén fuera para evitar que se vuelva a crear el valor al renderizar el componente */
const RESULTS_PER_PAGE = 4

/*
Una mejora que podemos hacer (no es necesario, con esto ya está muy bien) es crear un archivo `config.js` que contenga todas las constantes que se usen en la aplicación.

Por ejemplo, tener un:

```js
const DEFAULT_FILTERS = {
  RESULTS_PER_PAGE: 4
}
```

Y poder usarlo aquí y en `Home.jsx` cuando hacemos en la línea 16 esto:

```js
# ANTES:
 ? `/search?text=${searchText}&limit=4&offset=0`

# DESPUES:
 ? `/search?text=${searchText}&limit=${DEFAULT_FILTERS.RESULTS_PER_PAGE}&offset=0`
```

*/

export function SearchPage() {

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
  } = useFilters(RESULTS_PER_PAGE)

  return (
    <main className="main_estrecho">
      <div>

        <SearchFormSection onFilters={handleFilters} filters={filters} />

        <JobListing load={loading} jobsData={jobs} totalJobs={total} />

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handleSetCurrentPage} />

        <MostrandoNumRresults currentPage={currentPage} results={RESULTS_PER_PAGE} jobs={total} />

      </div>
    </main>
  );
}
