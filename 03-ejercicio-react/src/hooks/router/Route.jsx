import { useRouter } from "./useRouter.jsx"

const routes = [
    "/",
    "/search",
    "/contact"
]

export function Route({ path, component: Component, codeError }) {
    const { currentPath } = useRouter()
    const isValidRoute = routes.includes(currentPath)

    if (path === "*" && !isValidRoute) {
        return <Component codeError={codeError} />
    }

    if (currentPath !== path) return null

    return <Component />
}
