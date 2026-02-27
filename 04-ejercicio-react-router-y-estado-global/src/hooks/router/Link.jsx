import { NavLink } from "react-router"
import stl from '../../components/Header.module.css'

export function Link({ href, children, ...props }) {

    return (
        <NavLink to={href}
            className={({ isActive }) => isActive ? stl.navActive : ""} {...props}>
            {children}
        </NavLink>
    )
}