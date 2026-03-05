import { useParams } from "react-router"
import stl from "./DetailJob.module.css"
import { Link } from "../hooks/router/Link"
import { Spinner } from "../components/Spinner"
import ErrorPage from "./ErrorPage.jsx"
import { useFetchDetails } from "../hooks/detailJob/useFetchDetails.js"
import { useParseJob } from "../hooks/detailJob/useParseJob.js"
import { useAuthstore } from "../components/store/Authstore.js"
import { BtnFavorite } from "../hooks/global/BtnFavorite.jsx"
import { AplyButton } from "../hooks/global/AplyButton"


export default function DetailJob() {

    const { isLoggedIn } = useAuthstore()

    const { jobId } = useParams()

    const { job, loading, error } = useFetchDetails(jobId)
    const { responsibilities, requirements } = useParseJob(job)

    if (loading) return <Spinner position />
    if (error) return <ErrorPage codeError="notFoundJob" />


    return (
        <>
            <section className={stl.route}>
                <div>
                    <Link href="/search">Empleos</Link>
                    <span>/</span>
                    <span>{job.titulo}</span>
                </div>
            </section>

            <main className="main_estrecho">
                <div className={stl.titleOferta}>
                    <section>
                        <h1>{job.titulo}</h1>
                        <p>{job.empresa} • {job.ubicacion}</p>
                    </section>
                    <div className={stl.btnsDetalles}>
                        <AplyButton jobId={job.id} disabled={!isLoggedIn}>
                            {isLoggedIn ? 'Aplicar ahora' : 'Iniciar Sesión para aplicar'}
                        </AplyButton>
                        <BtnFavorite jobId={job.id} />
                    </div>
                </div>

                <div className={stl.desPuesto}>
                    <article>
                        <h2>Descripción del puesto</h2>
                        <p>
                            {job.descripcion}
                        </p>
                    </article>

                    <section>
                        <h2>Responsabilidades</h2>

                        {responsibilities.map((text, index) => (
                            <div key={index}>
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#09f"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        <path d="M9 12l2 2l4 -4" />
                                    </svg>
                                </div>

                                <p>{text}</p>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2>Requisitos</h2>

                        {requirements.map((text, index) => (
                            <div key={index}>
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#09f"
                                        strokeWidth="1"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                        <path d="M9 12l2 2l4 -4" />
                                    </svg>
                                </div>

                                <p>{text}</p>
                            </div>
                        ))}
                    </section>

                    <article>
                        <h2>Acerca de la empresa</h2>
                        <p>
                            {job.content.about}
                        </p>
                    </article>
                </div>

                <footer className={stl.btnFooter}>
                    <AplyButton jobId={job.id} disabled={!isLoggedIn}>
                        {isLoggedIn ? 'Aplicar ahora' : 'Iniciar Sesión para aplicar'}
                    </AplyButton>
                </footer>
            </main>
        </>
    )
}