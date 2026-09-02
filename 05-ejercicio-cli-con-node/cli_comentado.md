// readdir -> Lectura de directorios
// stat -> Información de archivos y directorios

import { readdir, stat } from 'node:fs/promises'

// join -> Unir rutas de archivos y directorios
import { join } from 'node:path'

// Constante para definir el ancho de padding en la salida ya que los nombres de archivos y directorios pueden ser muy largos y queremos que la salida sea ordenada
const PADDING_WIDTH = 35

// 1. Parsear los argumentos de la línea de comandos
const args = process.argv.slice(2)

// Validar si el usuario incluyó el flag de permisos
const hasPermission = args.includes('--permission')
if (!hasPermission) {
    console.error('Error: No tienes permisos para listar este directorio.')
    console.error('Solución: Ejecuta el comando incluyendo el flag --permission (ej: node cli.js --permission)')
    process.exit(1)
}

// Filtrar flags para encontrar el directorio (el primer argumento que no sea un flag, será el directorio a listar)
const dirArg = args.find(arg => !arg.startsWith('--'))
const dir = dirArg ?? '.'

// Flags para ordenar 
const isAsc = args.includes('--asc')
const isDesc = args.includes('--desc')

// Flags para filtrar por tipo
const onlyFiles = args.includes('--files')
const onlyFolders = args.includes('--folders')

// Función para truncar nombres largos y que aparezca con ...
const truncateName = (name, maxLength = PADDING_WIDTH) => {
    if (name.length <= maxLength) {
        return name
    }
    return name.slice(0, maxLength - 3) + '...'
}

// 2. Formateo simple de los tamaños
const formatSize = (size) => {
    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
    return `${(size / (1024 * 1024)).toFixed(2)} MB`
}

try {
    // 3. Leer los nombres
    const files = await readdir(dir)

    // 4. Leer la información de cada archivo
    let entries = await Promise.all(
        files.map(async (name) => {
            const fullPath = join(dir, name)
            const info = await stat(fullPath)

            return {
                name,
                idDir: info.isDirectory(),
                size: formatSize(info.size)
            }
        })
    )

    // 5. Filtrar por tipo (si aplican los flags --files o --folders)
    if (onlyFiles) entries = entries.filter(entry => !entry.idDir)
    if (onlyFolders) entries = entries.filter(entry => entry.idDir)

    // 6. Ordenar por nombre (si aplican los flags --asc o --desc)
    if (isAsc) entries.sort((a, b) => a.name.localeCompare(b.name))
    if (isDesc) entries.sort((a, b) => b.name.localeCompare(a.name))

    // 7. Mostrar resultados
    for (const entry of entries) {
        const icon = entry.idDir ? '📁' : '📄'
        const size = entry.idDir ? '-' : entry.size

        // Aplicamos el truncamiento antes de hacer el padEnd
        const displayName = truncateName(entry.name, PADDING_WIDTH)

        console.log(`${icon} ${displayName.padEnd(PADDING_WIDTH)} (${size})`)
    }

} catch (error) {
    console.error(`Error al leer el directorio "${dir}":`, error.message)
    process.exit(1)
}