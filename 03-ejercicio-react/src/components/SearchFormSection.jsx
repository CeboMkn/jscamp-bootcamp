import { useInfoFilters } from "../hooks/search/useInfoFilters.jsx"

export function SearchFormSection({ onFilters, filters }) {

    const { handleInfoForm, handleDellFilters, searchUI } = useInfoFilters({ onFilters, filters })

    const filtersEmpty = Object.values(filters).every(filter =>
        filter === '' || filter === null || filter === undefined
    )

    return (
        <section className="sec_main">
            <h1>Encuentra tu próximo trabajo</h1>
            <p>Explora miles de oportunidades en el sector tecnológico</p>

            <form className="form_princi w-100" action="" role="search">
                <div>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-search"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>

                    <input
                        value={searchUI}
                        onChange={handleInfoForm}
                        name="search"
                        type="text"
                        placeholder="Buscar trabajos, empresas o habilidades"
                    />
                </div>

                <div className="section_filter">
                    <div>
                        <select name="tecnologia" onChange={handleInfoForm} value={filters.tecnologia || ''}>
                            <option value="" disabled hidden>
                                Tecnología
                            </option>
                            <option value="javascript">JavaScript</option>
                            <option value="react">React</option>
                            <option value="node">Node.js</option>
                            <option value="python">Python</option>
                            <option value="sql">SQL</option>
                            <option value="typescript">TypeScript</option>
                            <option value="aws">AWS</option>
                            <option value="docker">Docker</option>
                            <option value="mongodb">MongoDB</option>
                            <option value="kubernetes">Kubernetes</option>
                        </select>

                        <select name="ubicacion" onChange={handleInfoForm} value={filters.ubicacion || ''}>
                            <option value="" disabled hidden>
                                Ubicación
                            </option>
                            <option value="remoto">Remoto</option>
                            <option value="cdmx">Ciudad de México</option>
                            <option value="guadalajara">Guadalajara</option>
                            <option value="barcelona">Barcelona</option>
                            <option value="bsas">Buenos Aires</option>
                            <option value="madrid">Madrid</option>
                            <option value="valencia">Valencia</option>
                            <option value="bogota">Bogotá</option>
                        </select>

                        {/* <select name="tipo" onChange={handleInfoForm} value={filters.tipo || ''}>
                            <option value="" disabled hidden>
                                Tipo de contrato
                            </option>
                            <option value="tiempo_completo">Tiempo completo</option>
                            <option value="freelance">Freelance</option>
                            <option value="temporal">Temporal</option>
                            <option value="practicas">Prácticas</option>
                        </select> */}

                        <select name="nivel" onChange={handleInfoForm} value={filters.nivel || ''}>
                            <option value="" disabled hidden>
                                Nivel de experiencia
                            </option>
                            <option value="junior">Junior</option>
                            <option value="mid">Mid</option>
                            <option value="mid-level">Mid Level</option>
                            <option value="senior">Senior</option>
                        </select>
                    </div>
                    {!filtersEmpty && (
                        <div>
                            <button type="button" onClick={handleDellFilters} className="btn_del_filters">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="icon icon-tabler icons-tabler-outline icon-tabler-x"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M18 6l-12 12" />
                                    <path d="M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </section>
    )
}