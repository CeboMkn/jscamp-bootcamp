export function JobCard({ job }) {
    return (
        <div className="res_busqueda">
            <li>
                <article>
                    <div>
                        <a href={job.enlace || "#"}>
                            <h3 className="title_job">{job.titulo}</h3>
                        </a>

                        <small className="first_p">
                            {job.empresa} | {job.ubicacion}
                        </small>

                        <p className="second_p">{job.descripcion}</p>
                    </div>
                    <div>
                        <button className="btn_info btn_active" type="button">
                            Aplicar
                        </button>
                    </div>
                </article>
            </li>
        </div>
    )
}