import { useCurrentPath } from "../hooks/global/useCurrentPath";
import { Link } from "./link";

export function Header() {

  const pathActual = useCurrentPath()

  return (
    <header className="header">

      <div className="logo_header">
        <Link href="/">
          <h2>
            <svg
              width="25"
              height="25"
              viewBox="0 0 16.479 16.479"
              fill="#09f"
            >
              <g>
                <path d="M13.484,8.239l2.994,1.728l-2.621,4.544l-2.995-1.729v3.458H5.617v-3.458l-2.995,1.729L0,9.967l2.995-1.728L0,6.509l2.622-4.54l2.995,1.729V0.239h5.245v3.458l2.995-1.729l2.621,4.54L13.484,8.239z" />
              </g>
            </svg>DevJobs</h2>
        </Link>
        <nav className="nav">
          <Link href="/" className={pathActual === "/" ? "navActive" : ""}>
            Inicio
          </Link>

          <Link href="/search" className={pathActual === "/search" ? "navActive" : ""}>
            Empleos
          </Link>

          <Link href="/contact" className={pathActual === "/contact" ? "navActive" : ""}>
            Contacto
          </Link>
        </nav>
      </div>

      <div>
        <Link className="a_head" href="/subir-cv">Subir CV</Link>
        <img
          src="src/assets/img/luffy_profile.jpg"
          alt="Avatar del usuario"
          width="50"
          height="50"
        />
      </div>
    </header>
  )
}