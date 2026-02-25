import { useRouter } from "./useRouter.jsx"

/* Excelente!! Expliqué esto a otros chicos que no les funcionaba el 404 por esta razón. */
/* Hay una manera de evitar hacer esto con un array escrito a mano y agarrar las rutas de los componentes de manera dinámica. Te lo muestro debajo */

/* 0. Creamos un Set para almacenar las rutas validas */
const VALID_ROUTES = new Set()

export function Route({ path, component: Component, codeError }) {
    const { currentPath } = useRouter()

    /* 1. Si el path no es 404, agregamos la ruta que viene por prop */
    if(path !== '*') {
        VALID_ROUTES.add(path)
    }

    /* 2. Si el path es 404 y el currentPath no está en la lista de VALID_ROUTES, retornamos el componente 404 */
    if(path === '*' && !VALID_ROUTES.has(currentPath)) {
        return <Component codeError={codeError} />
    }

    if (currentPath !== path) return null

    return <Component />
}


/*
EXPLICACIÓN DE ESTO:

El CÓDIGO del componente Route se IMPORTA una sola vez en App.jsx cuando se hace `import { Route } from './hooks/router/Route.jsx'`. Esto hace que luego podamos acceder al componente Route y que 
ya tengamos disponible el array VALID_ROUTES.

Una vez importado el código, el componente Route se EJECUTA cada vez que se llama en App.jsx, por lo tanto, como el array de VALID_ROUTES ya está disponible, no se vuelve a generar perdiendo 
su valor anterior. En cada ejecución de Route se agrega la ruta que viene por prop al array VALID_ROUTES.

De esta manera, independientemente cuantas páginas agreguemos en App.jsx, el array VALID_ROUTES se va a ir llenando con todas las rutas de los componentes que se van a renderizar.
*/