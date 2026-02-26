import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'

/* Hola crack! Sacar el StrictMode puede ser útil para depurar y ver cuantas 
veces se renderiza un componente realmente (StrictMode en algunas ocasiones hace
que el componente se cargue dos veces, que OJO, no está mal, siempre es en modo desarrollo, 
pero siempre que podamos hay que dejarlo). Ayuda mucho a ver errores que pueden ocurrir en el código. */

createRoot(document.getElementById('root')).render(
        <StrictMode>
                <App />
        </StrictMode>
)
