import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const PADDING_WIDTH = 35

const args = process.argv.slice(2)

const dirArg = args.find(arg => !arg.startsWith('--'))
const dir = dirArg ?? '.'
/* En vez de buscar manualmente, podemos usar las herramientas nativas de node. Además vamos a validar de que el permiso sea de lectura, y que sea para el directorio que queremos acceder */
// const hasPermission = args.includes('--permission')
const hasPermission = process.permission?.has('fs.read', dir)
if (!hasPermission) {
    console.error('Error: No tienes permisos para listar este directorio.')
    console.error(`Solución: Ejecuta el comando incluyendo el flag --permission (ej: node --permission --allow-fs-read=${dir} cli.js ${dir})`)
    process.exit(1)
}


const isAsc = args.includes('--asc')
const isDesc = args.includes('--desc')

const onlyFiles = args.includes('--files')
const onlyFolders = args.includes('--folders')

const truncateName = (name, maxLength = PADDING_WIDTH) => {
    if (name.length <= maxLength) {
        return name
    }
    return name.slice(0, maxLength - 3) + '...'
}

const formatSize = (size) => {
    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
    return `${(size / (1024 * 1024)).toFixed(2)} MB`
}

let files
try {
    files = await readdir(dir)
/* No hace falta extender tanto el catch, si falla esta operación entonces la capturamos enseguida */
} catch (error) {
    console.error(`Error al leer el directorio "${dir}":`, error.message)
    process.exit(1)
}

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

    if (onlyFiles) entries = entries.filter(entry => !entry.idDir)
    if (onlyFolders) entries = entries.filter(entry => entry.idDir)

    if (isAsc) entries.sort((a, b) => a.name.localeCompare(b.name))
    if (isDesc) entries.sort((a, b) => b.name.localeCompare(a.name))

    // Lo que hiciste está genial, pero te muestro una alternativa con `table` por si te interesa
    const listResult = []
    for (const entry of entries) {
        const icon = entry.idDir ? '📁' : '📄'
        const size = entry.idDir ? '-' : entry.size

        const displayName = truncateName(entry.name, PADDING_WIDTH)

        listResult.push({
            type: icon,
            name: displayName,
            size
        })

        // console.log(`${icon} ${displayName.padEnd(PADDING_WIDTH)} (${size})`)
    }
    console.table(listResult)