import { useRouter } from "../hooks/router/useRouter"

export function Link({ href, children, ...restProps }) {

    const { navigateTo } = useRouter()

    const handleClick = (e) => {
        e.preventDefault()
        navigateTo(href)
    }

    return (
        <a href={href} {...restProps} onClick={handleClick}>
            {children}
        </a>
    )
}