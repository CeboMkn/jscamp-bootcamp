/* Aquí va la lógica para filtrar los resultados de búsqueda */
import { allJobs, containers_resultados } from "./fetch-data.js"

let pageActual = 1
const RESULTS_PAGES = 4
let numbersNav = 0
const container_nav = document.querySelector('.paginacion ul')

activar_filtros()
search_job()

function activar_filtros() {

    let filters = {
        tecnologia: '',
        ubicacion: '',
        tipo_contrato: '',
        nivel_experiencia: ''
    }

    const filters_contain = document.getElementById('filters')

    filters_contain.addEventListener('change', (e) => {

        const target = e.target
        const { id, value } = target

        if (id.startsWith('filter-')) {

            const key = id.replace("filter-", "")
            filters[key] = value.toLowerCase()
            aplicar_filtros()
        }
    })

    filters_contain.addEventListener('click', (e) => {

        const target = e.target
        const btn_del = target.closest('#btn_del_filters')

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

    function aplicar_filtros() {

        if (!containers_resultados) {
            console.error('No se encuentra los contenedores de los resultados')
            return
        }

        const campos = Object.keys(filters);

        containers_resultados.forEach(res => {

            const datos = res.dataset;
            const visible = campos.every(campo => {

                const filtro = filters[campo];
                return !filtro || datos[campo].includes(filtro);
            });

            res.style.display = visible ? 'flex' : 'none';
        });
    }
}

function search_job() {

    const input = document.getElementById('search_input')

    input.addEventListener('input', () => {

        containers_resultados.forEach(res => {

            const text_h = res.querySelector('.title_job').textContent.toLowerCase()
            const text_input = input.value.toLowerCase()

            text_h.includes(text_input)

                ? res.style.display = 'flex'
                : res.style.display = 'none'
        })
    })
}

export function renderJobs() {

    const container = document.getElementById('jobs-listings');
    container.innerHTML = "";

    const empezarAmostrar = (pageActual - 1) * RESULTS_PAGES
    const hastaDondeMostrar = empezarAmostrar + RESULTS_PAGES

    numbersNav = Math.ceil(allJobs.length / 4)

    const indicesQueSeMuestran = allJobs.slice(empezarAmostrar, hastaDondeMostrar)

    indicesQueSeMuestran.forEach(job => {

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

    const prevLi = container_nav.firstElementChild;
    const nextLi = container_nav.lastElementChild;

    container_nav.innerHTML = ''
    container_nav.appendChild(prevLi)

    for (let i = 1; i <= numbersNav; i++) {

        const li = document.createElement('li')
        li.innerHTML = `<a href="#" data-page="${i}">${i}</a>`;
        if (i === 1) {

            li.classList.add('pag_active')
            prevLi.classList.add('nav_disabled')
        }
        container_nav.appendChild(li)
    }
    container_nav.appendChild(nextLi)
}

navResultados()

function navResultados() {

    if (!container_nav) return

    container_nav.addEventListener('click', (e) => {

        e.preventDefault()
        const target = e.target
        const link = target.closest('a')

        if (!link) return

        const numberPage = link.dataset.page;

        if (numberPage) {

            pageActual = parseInt(numberPage)
            renderJobs()
            paginaActiva()
        }

        const li = link.closest('li')
        const prev = li.querySelector('.icon-tabler-chevron-left')
        const next = li.querySelector('.icon-tabler-chevron-right')

        if (prev && pageActual > 1) {
            pageActual--
            renderJobs()
            paginaActiva()
        }

        if (next && pageActual < numbersNav) {
            pageActual++
            renderJobs()
            paginaActiva()
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
