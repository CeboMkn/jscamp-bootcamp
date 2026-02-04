import { useEffect } from 'react';

const APP_NAME = 'DevJobs';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
      ? title
      : APP_NAME;
  }, [title]);
}
