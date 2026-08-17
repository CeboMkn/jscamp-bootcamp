import { Link } from "../hooks/router/Link"
import { useAuthstore } from "./store/Authstore"
import styles from './JobCard.module.css'
import { BtnFavorite } from "../hooks/global/BtnFavorite"
import { AplyButton } from "../hooks/global/AplyButton"

export function JobCard({ job }) {

    const { isLoggedIn } = useAuthstore()

    return (
        <div className={styles.resBusqueda}>
            <li>
                <article>
                    <div>
                        <Link href={`/job/${job.id}`} /* target="_blank" rel="noreferrer" */>
                            <h3 className="title_job">{job.titulo}</h3>
                        </Link>

                        <small className={styles.firstP}>
                            {job.empresa} | {job.ubicacion}
                        </small>

                        <p className={styles.secondP}>{job.descripcion}</p>
                    </div>
                    <div className={isLoggedIn ? styles.btnsJobCard : ''}>
                        <AplyButton jobId={job.id} />
                        <BtnFavorite jobId={job.id} isLoggedIn={isLoggedIn} />
                    </div>
                </article>
            </li>
        </div>
    )
}


