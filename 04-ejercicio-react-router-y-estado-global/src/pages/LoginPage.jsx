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
                        <h3>Login</h3>
                        <div className={stl.inputForm}>
                            <input type="text" name="" id="" placeholder='mi@correo.es' />
                        </div>
                        <div className={stl.inputForm}>
                            <input type="password" name="" id="" placeholder='Contraseña' />
                        </div>
                        <div>
                            <BtnGlobal onClick={login}>
                                 Iniciar Sesión
                            </BtnGlobal>
                        </div>
                        <div>
                            ¿No tienes cuenta? <Link to='/register'> Registrate </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}