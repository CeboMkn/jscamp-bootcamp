import { useParams } from "react-router"
import stl from "./DetailJob.module.css"
import { Link } from "../hooks/router/Link"
import { Spinner } from "../components/Spinner"
import ErrorPage from "./ErrorPage.jsx"
import { useFetchDetails } from "../hooks/detailJob/useFetchDetails.js"
// import { useParseJob } from "../hooks/detailJob/useParseJob.js"
import { useAuthstore } from "../components/store/Authstore.js"
import { BtnFavorite } from "../hooks/global/BtnFavorite.jsx"
import { AplyButton } from "../hooks/global/AplyButton"

import snarkdown from "snarkdown";


export default function DetailJob() {

    const { isLoggedIn } = useAuthstore()

    const { jobId } = useParams()

    const { job, loading, error } = useFetchDetails(jobId)
    // Ya no hace falta usar `useParseJob`
    /* const { responsibilities, requirements } = useParseJob(job) */

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
                    <DetailJobSection
                        title="Descripción"
                        content={job.content.description}
                    />
                    <DetailJobSection
                        title="Responsabilidades"
                        content={job.content.responsibilities}
                    />
                    <DetailJobSection
                        title="Requisitos"
                        content={job.content.requirements}
                    />
                    <DetailJobSection
                        title="Acerca de la empresa"
                        content={job.content.about}
                    />
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

function DetailJobSection({ title, content }) {
  const htmlContent = snarkdown(content);

  return (
    /* Luego aquí podes poner estilos a nivel de `section` para estilar lo que quieras dentro del HTML devuelto por jobs */
    <section>
      <h2>{title}</h2>
      <div
        className={`prose`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </section>
  );
}
