const APP_NAME = 'DevJobs';

export function useDocumentTitle(title) {
  document.title = title
    ? `${APP_NAME} | ${title}`
    : APP_NAME;
}
