import stl from './BtnGlobal.module.css'
import { Link } from '../router/Link.jsx';

export const BtnGlobal = ({
    children,
    onClick,
    disabled = false,
    type = "button",
    to,
    className = ""
}) => {
    const classes = `${stl.btnInfo} ${className}`;

    if (to && !disabled) {
        return (
            <Link to={to} className={classes} onClick={onClick}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};