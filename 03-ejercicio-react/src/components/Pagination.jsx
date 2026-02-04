import styles from '../css_module/Pagination.module.css'

export function Pagination({ currentPage = 1, totalPages = 1, onPageChange }) {

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;

    const stylePrevButton = isFirstPage ? { pointerEvents: 'none', opacity: 0.5 } : {}
    const styleNextButton = isLastPage ? { pointerEvents: 'none', opacity: 0.5 } : {}

    const handlePrevClick = (e) => {
        e.preventDefault()
        if (!isFirstPage) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNextClick = (e) => {
        e.preventDefault()
        if (!isLastPage)
            onPageChange(currentPage + 1)
    }

    const handleChangePage = (e) => {
        e.preventDefault()
        const page = Number(e.target.dataset.page)
        if (page !== currentPage) {
            onPageChange(page)
        }
    }

    return (
        <nav className={styles.paginacion}>
            <ul>
                <li style={stylePrevButton}>
                    <a href="#" onClick={handlePrevClick}>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M15 6l-6 6l6 6" />
                        </svg>
                    </a>
                </li>

                {pages.map(page => (
                    <li
                        key={page}
                        className={currentPage === page ? styles.pagActive : ''}>
                        <a href="#"
                            data-page={page}
                            onClick={handleChangePage}>{page}
                        </a>
                    </li>
                ))}

                <li style={styleNextButton}>
                    <a href="#" onClick={handleNextClick}>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M9 6l6 6l-6 6" />
                        </svg>
                    </a>
                </li>
            </ul>
        </nav>
    )
}