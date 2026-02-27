import { NavLink } from "react-router"

export function Link({ href, children, ...props }) {

    return (
        <NavLink to={href}
            className={({ isActive }) => isActive ? "navActive" : ""} {...props}>
            {children}
        </NavLink>
    )
}