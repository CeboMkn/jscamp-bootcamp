export const errors = {
    notFound: {
        code: 404,
        message: "404 - Página no encontrada",
        description: "La ruta a la que intenta acceder no existe o ha sido eliminada."
    },

    unauthorized: {
        code: 401,
        message: "401 - No autorizado",
        description: "Debe iniciar sesión para acceder a este contenido."
    },

    forbidden: {
        code: 403,
        message: "403 - Acceso denegado",
        description: "No tiene permisos suficientes para acceder a esta sección."
    },

    serverError: {
        code: 500,
        message: "500 - Error interno del servidor",
        description: "Ha ocurrido un error inesperado. Inténtelo de nuevo más tarde."
    },

    networkError: {
        code: 0,
        message: "Error de conexión",
        description: "No se pudo conectar con el servidor. Compruebe su conexión a internet."
    },

    notFoundJob: {
        code: " | El trabajo que buscas no existe",
        message: "Lo sentimos",
        description: "El trabajo que buscas no existe"
    }
}
