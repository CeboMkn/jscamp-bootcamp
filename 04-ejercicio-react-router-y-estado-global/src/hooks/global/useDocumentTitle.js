import { useEffect } from 'react';

const APP_NAME = 'DevJobs';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${APP_NAME} | ${title}` // Excelente idea!! Algunas páginas hacen esto por SEO, es una buena práctica. Así el título de la página se ve en el navegador y en los resultados de búsqueda.
      : APP_NAME;
  }, [title]);
}
