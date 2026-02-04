import { useState } from "react";
import { useDocumentTitle } from "../global/useDocumentTitle.js";

export function useContactForm() {

    const emailRegexp = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/

    /* ESTADOS **********************************************************************/

    /* CAMPOS DEL FORMULARIO */
    const [values, setValues] = useState({
        email: '',
        name: '',
        subname: '',
        dudas: ''
    })

    /* ERRORES EN EL FORMULARIO */
    const [errors, setErrors] = useState({
        email: false,
        name: false,
        subname: false,
        dudas: false
    })

    /* ¿SE HA HECHO SUBMIT? */
    const [submitted, setSubmitted] = useState(false)

    /* ESTADO DEL ENVIO (ENVIAR, ENVIANDO O ENVIADO) */
    const [sendStatus, setSendStatus] = useState('enviar')

    /* SEGUN ESTADO CAMBIA EL TITLE */
    const titleByStatus = {
        enviando: 'Enviando mensaje…',
        enviado: 'Gracias por su mensaje :)',
        error: 'Error al enviar'
    }

    useDocumentTitle(titleByStatus[sendStatus] ?? 'Contacta con nosotros')

    /* MOSTRAR VALIDACIÓN SOLO SI HUBO SUBMIT Y AÚN NO SE ENVIÓ CORRECTAMENTE */
    const showValidation = submitted && sendStatus !== 'enviado'

    /* *****************************************************************************/

    /* COMPROBAR SI SE PUEDE ENVIAR O NO EL FORMULARIO */

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = {
            name: values.name.trim() === '',
            subname: values.subname.trim() === '',
            dudas: values.dudas.trim() === '',
            email:
                values.email.trim() === '' ||
                !emailRegexp.test(values.email)
        }

        const hasErrors = Object.values(newErrors).some(Boolean)
        if (hasErrors) {
            setSubmitted(true)
            setErrors(newErrors)
            return
        }
        sendData(values)
    }

    /* DETECTAR CAMBIOS EN EL FORMULARIO PARA CAMBIAR ESTADO DE (VALUES) Y DE (ERRORS) 'VALIDACIÓN' */

    const handleChange = (e) => {
        const { name, value } = e.target

        setValues(prev => ({
            ...prev,
            [name]: value
        }))

        if (!submitted) return

        setErrors(prev => ({
            ...prev,
            [name]:
                name === 'email'
                    ? value.trim() === '' || !emailRegexp.test(value)
                    : value.trim() === ''
        }))
    }

    /* ENVIAR FORMULARIO */

    async function sendData(v) {
        setSendStatus('enviando')
        try {
            await new Promise(resolve => setTimeout(resolve, 1500))
            console.log('Datos enviados', v)
            setSendStatus('enviado')
        } catch {
            setSendStatus('error')
        }
    }

    return {
        values,
        errors,
        sendStatus,
        showValidation,
        handleChange,
        handleSubmit
    }
}