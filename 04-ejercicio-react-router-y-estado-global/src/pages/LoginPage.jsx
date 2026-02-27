import { Link } from 'react-router'
import { BtnGlobal } from '../hooks/global/BtnGlobal'
import stl from './LoginPage.module.css'
import { useAuthstore } from '../components/store/Authstore'

export default function LoginPage() {
    const { login } = useAuthstore()
    return (
        <main className="main_estrecho">
            <div className={stl.container}>
                <div className={stl.containerForm}>
                    <form action="" className={stl.formLogin}>
                        <div className={stl.inputForm}>
                            <input type="text" name="" id="" placeholder='mi@correo.es' />
                        </div>
                        <div className={stl.inputForm}>
                            <input type="password" name="" id="" placeholder='Contraseña' />
                        </div>
                        <div className={stl.containerRecordar}>
                            <div className={stl.recordar}>
                                <input type="checkbox" name="recordar" id="recordar" />
                                <label htmlFor="recordar">Recordar</label>
                            </div>
                            <div className={stl.olvidar}>
                                <a href="">¿Olvidaste tu contraseña?</a>
                            </div>
                        </div>
                        <div className={stl.btnLogin}>
                            <button onClick={login}>
                                Iniciar Sesión
                            </button>
                        </div>
                        <div className={stl.separador}>
                            <p >¿No tienes una cuenta?</p>
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
