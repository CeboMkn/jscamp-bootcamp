import { useState } from 'react'
import { Link } from '../hooks/router/Link'
import stl from './LoginPage.module.css'
import { useAuthstore } from '../components/store/Authstore'
import { useDocumentTitle } from '../hooks/global/useDocumentTitle'

export default function LoginPage() {
    useDocumentTitle('Iniciar Sesión')
    const { login } = useAuthstore()
    const handleLogin = (e) => {
        e.preventDefault()
        login()
    }

    const [onViewPassword, setOnViewPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    return (
        <main className="main_estrecho">
            <div className={stl.container}>
                <div className={stl.containerTitle}>
                    <h1>Bienvenido</h1>
                    <p>Inicia sesión para encontrar tu próxima oportunidad</p>
                </div>
                <div className={stl.containerForm}>
                    <form action="" className={stl.formLogin}>
                        <div className={stl.inputForm}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ffffff7e"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-mail"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                                <path d="M3 7l9 6l9 -6" />
                            </svg>
                            <input type="text" name="" id="" placeholder='Email' />
                        </div>
                        <div className={stl.inputForm}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ffffff7e"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="icon icon-tabler icons-tabler-outline icon-tabler-lock"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" />
                                <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                                <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                            </svg>

                            <input type={onViewPassword ? "text" : "password"} name="" id="" placeholder='Contraseña' />
                            {onViewPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => setOnViewPassword(false)}
                                    width="24"
                                    style={{ cursor: "pointer" }}
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#ffffff7e"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icons-tabler-outline icon-tabler-eye"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => setOnViewPassword(true)}
                                    width="24"
                                    style={{ cursor: "pointer" }}
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#ffffff7e"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icons-tabler-outline icon-tabler-eye-closed"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4" />
                                    <path d="M3 15l2.5 -3.8" />
                                    <path d="M21 14.976l-2.492 -3.776" />
                                    <path d="M9 17l.5 -4" />
                                    <path d="M15 17l-.5 -4" />
                                </svg>
                            )}
                        </div>
                        <div className={stl.containerRecordar}>
                            <div className={stl.recordar}>
                                <input type="checkbox" name="recordar" id="recordar" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                <label htmlFor="recordar">Recordar</label>
                            </div>
                            <div>
                                <Link className={stl.link} to="/login">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                        </div>
                        <div className={stl.btnLogin}>
                            <button onClick={handleLogin}>
                                Iniciar Sesión
                            </button>
                        </div>
                        <div className={stl.separador}>
                            <Link className={stl.link} to="/register">
                                ¿No tienes una cuenta?
                            </Link>
                        </div>
                        <div className={stl.containerIniciar}>
                            <div className={stl.insideContainerIniciar}>
                                <p>Iniciar como desarrollador</p>
                            </div>
                            <div className={stl.insideContainerIniciar}>
                                <p>Iniciar como compañia</p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
