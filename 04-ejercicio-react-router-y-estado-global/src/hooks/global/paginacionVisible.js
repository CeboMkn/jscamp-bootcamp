export function paginacionVisible(currentPage, totalPages) {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const centerPage = Math.min(Math.max(4, currentPage), totalPages - 3);

    return [
        1,
        centerPage > 4 ? null : 2,
        centerPage - 1,
        centerPage,
        centerPage + 1,
        centerPage < totalPages - 3 ? null : totalPages - 1,
        totalPages
    ];
}