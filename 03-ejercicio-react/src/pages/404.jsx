import { errors } from "../helper/errorMesagesPage.js"
import { useDocumentTitle } from "../hooks/global/useDocumentTitle.js"

export function ErrorPage({ codeError }) {

    const { code, message, description } = errors[codeError]
    useDocumentTitle(`Error ${code}`)
    return (
        <main>
            <div className="containerNotFound">
                <h1>{message}</h1>
                <p>{description}</p>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-mood-puzzled"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M14.986 3.51a9 9 0 1 0 1.514 16.284c2.489 -1.437 4.181 -3.978 4.5 -6.794" />
                    <path d="M10 10h.01" />
                    <path d="M14 8h.01" />
                    <path d="M12 15c1 -1.333 2 -2 3 -2" />
                    <path d="M20 9v.01" />
                    <path d="M20 6a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
                </svg>
            </div>
        </main>
    )
}
