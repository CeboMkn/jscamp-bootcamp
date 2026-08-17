import styles from './Pagination.module.css'
import { paginacionVisible } from '../hooks/global/paginacionVisible';

export function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const handleChangePage = (page) => (e) => {
        e.preventDefault();
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    }

    return (
        <nav className={styles.paginacion}>
            <ul>
                <li className={isFirstPage ? styles.buttonDisabled : ''}>
                    <a href="#" onClick={isFirstPage ? (e) => e.preventDefault() : handleChangePage(currentPage - 1)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M15 6l-6 6l6 6" />
                        </svg>
                    </a>
                </li>

                {paginacionVisible(currentPage, totalPages).map((page, i) =>
                    page === null ? (
                        <li key={`ellipsis-${i}`} className={styles.buttonDisabled}>
                            <span>...</span>
                        </li>
                    ) : (
                        <li key={page} className={currentPage === page ? styles.pagActive : ''}>
                            <a href="#" onClick={handleChangePage(page)}>
                                {page}
                            </a>
                        </li>
                    )
                )}

                <li className={isLastPage ? styles.buttonDisabled : ''}>
                    <a href="#" onClick={isLastPage ? (e) => e.preventDefault() : handleChangePage(currentPage + 1)}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 6l6 6l-6 6" />
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

