import { Link } from 'react-router'
import { BtnGlobal } from '../hooks/global/BtnGlobal'
import stl from './RegisterPage.module.css'
import { useAuthstore } from '../components/store/Authstore'

export default function RegisterPage() {
    const { login } = useAuthstore()
    return (
        <main className="main_estrecho">
            <div className={stl.container}>
                <div className={stl.containerForm}>
                    <form action="" className={stl.formLogin}>
                        <h3>Registrarse</h3>
                        <div className={stl.inputForm}>
                            <input type="text" name="" id="" placeholder='mi@correo.es' />
                        </div>
                        <div className={stl.inputForm}>
                            <input type="password" name="" id="" placeholder='Contraseña' />
                        </div>
                        <div className={stl.inputForm}>
                            <input type="password" name="" id="" placeholder='Repetir Contraseña' />
                        </div>
                        <div>
                            <BtnGlobal>
                                 Crear Cuenta
                            </BtnGlobal>
                        </div>
                        <div>
                            ¿Ya tienes una cuenta? <Link to='/login'> Inicia Sesión </Link>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}