/* Aquí va la lógica para filtrar los resultados de búsqueda */
import { getJobs } from "./fetch-data.js"
import { allJobs, containers_resultados } from "./fetch-data.js"

let pageActual = 1
let results_pages = 4
let numbersNav = 0
const container_nav = document.querySelector('.paginacion ul')
let jobFilter = []

getJobs().then(() => {
    jobFilter = [...allJobs]
    renderJobs()
})
activar_filtros()

const select_num_result = document.getElementById('num_result')
for (let i = 1; i <= 10; i++) {
    const op = document.createElement('option')
    op.value = i
    op.textContent = i
    if (i === 4) {
        op.selected = true
    }
    select_num_result.appendChild(op)
}

select_num_result.addEventListener('change', () => {
    results_pages = Number(select_num_result.value)
    pageActual = 1
    renderJobs()

})

let filters = {
    tecnologia: '',
    ubicacion: '',
    tipo: '',
    nivel: '',
    text: ''
}

function activar_filtros() {

    const filters_contain = document.getElementById('filters')
    const input = document.getElementById('search_input')

    /* APLICAR FILTROS A ESCRIBIR */
    input.addEventListener('input', () => {

        filters.text = input.value.toLowerCase()
        aplicar_filtros()
    })

    /* APLICAR FILTROS AL CAMBIAR SELECT */
    filters_contain.addEventListener('change', (e) => {

        const target = e.target
        const { id, value } = target

        if (id.startsWith('filter-')) {

            const key = id.replace("filter-", "")
            filters[key] = value.toLowerCase()
            aplicar_filtros()
        }
    })

    /* RESET FILTROS */
    filters_contain.addEventListener('click', (e) => {

        const btn_del = e.target.closest('#btn_del_filters')

        if (btn_del) {

            document.querySelectorAll('#filters select').forEach(sel => {
                sel.selectedIndex = 0
            })
            Object.keys(filters).forEach(key => {
                filters[key] = ''
            })
            aplicar_filtros()
        }
    })

    /* CREA JOBFILTER CON LOS FILTROS PARA RENDERJOBS */
    function aplicar_filtros() {

        if (!containers_resultados) {
            console.error('No se encuentra los contenedores de los resultados')
            return
        }

        const onFilters = Object.values(filters).some(v => v !== '')
        const { text } = filters
        if (!onFilters) {
            jobFilter = [...allJobs]
            pageActual = 1
            renderJobs()
            return
        }

        jobFilter = allJobs.filter(job => {
            const data = job.data

            if (text) {
                const texto = `${job.titulo} ${job.empresa}`.toLowerCase()
                const palabras = text.split(/\s+/).filter(p => p.trim() !== '')
                const coincide = palabras.every(palabra => texto.includes(palabra))
                if (!coincide) return false
            }
            for (const campo in filters) {
                const filtro = filters[campo]
                if (!filtro || campo === "text") continue

                const dataJob = data[campo] ?? job[campo]
                if (!dataJob) return false
                if (Array.isArray(dataJob)) {
                    if (!dataJob.some(t => t.toLowerCase().includes(filtro))) return false
                } else {
                    if (dataJob.toLowerCase() !== filtro) return false
                }
            }
            return true
        })
        pageActual = 1
        renderJobs()
    }
}

export function renderJobs() {

    const container = document.getElementById('jobs-listings');
    container.innerHTML = "";

    const start = (pageActual - 1) * results_pages
    const end = start + results_pages

    numbersNav = Math.ceil(jobFilter.length / results_pages)

    jobFilter.slice(start, end).forEach(job => {

        const div = document.createElement('div');
        div.className = 'res_busqueda';

        div.dataset.tecnologia = job.data.tecnologia;
        div.dataset.ubicacion = job.data.ubicacion;
        div.dataset.tipo_contrato = job.data.tipo;
        div.dataset.nivel_experiencia = job.data.nivel;

        div.innerHTML = `
        <li>
            <article>
                <div>
                    <a href="${job.enlace}">
                      <h3 class="title_job">${job.titulo}</h3>
                    </a>
                    <small class="first_p">${job.empresa} | ${job.ubicacion}</small>
                    <p class="second_p">${job.descripcion}</p>
                </div>
                <div>
                    <button class="btn_info btn_active" type="submit">Aplicar</button>
                </div>
            </article>
        </li>
          `;

        container.appendChild(div);
    });

    generateNav()
}

function generateNav() {

    if (!container_nav) return;

    container_nav.innerHTML = '';  // limpiar todo

    // Prev
    const prevLi = document.createElement('li');
    prevLi.innerHTML = `
        <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M15 6l-6 6l6 6" />
                            </svg></a>
    `;
    if (pageActual === 1) prevLi.classList.add("nav_disabled");
    container_nav.appendChild(prevLi);

    // Números de página
    for (let i = 1; i <= numbersNav; i++) {

        const li = document.createElement('li');
        li.innerHTML = `<a href="#" data-page="${i}">${i}</a>`;

        if (i === pageActual) li.classList.add('pag_active');

        container_nav.appendChild(li);
    }

    // Next
    const nextLi = document.createElement('li');
    nextLi.innerHTML = `
        <a href="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                                fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M9 6l6 6l-6 6" />
                            </svg>
                        </a>
    `;
    if (pageActual === numbersNav) nextLi.classList.add("nav_disabled");

    container_nav.appendChild(nextLi);
}

navResultados()

function navResultados() {

    if (!container_nav) return

    container_nav.addEventListener('click', (e) => {

        e.preventDefault()

        const link = e.target.closest('a')
        if (!link) return

        const li = link.closest('li')
        const lis = Array.from(container_nav.children)

        const esPrimero = li === lis[0]
        const esUltimo = li === lis[lis.length - 1]

        // Prev
        if (esPrimero && pageActual > 1) {
            pageActual--
            renderJobs()
            return
        }

        // Next
        if (esUltimo && pageActual < numbersNav) {
            pageActual++
            renderJobs()
            return
        }

        // Número
        let numberPage = link.dataset.page
        if (numberPage) {
            pageActual = parseInt(numberPage)
            renderJobs()
            return
        }
    })
}


function paginaActiva() {

    const lis = container_nav.querySelectorAll('li')
    lis.forEach(li => li.classList.remove('pag_active'))

    const activeli = Array.from(lis).find(li => {

        const a = li.querySelector('a');
        return a && parseInt(a.dataset.page) === pageActual;
    })

    if (activeli) activeli.classList.add('pag_active')

    const prevLi = container_nav.querySelector('li .icon-tabler-chevron-left')?.closest('li');
    const nextLi = container_nav.querySelector('li .icon-tabler-chevron-right')?.closest('li');

    if (prevLi) prevLi.classList.toggle('nav_disabled', pageActual === 1);
    if (nextLi) nextLi.classList.toggle('nav_disabled', pageActual === numbersNav);
}
