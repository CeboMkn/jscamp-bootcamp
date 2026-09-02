import stl from './JobListing.module.css'
import { JobCard } from "./JobCard.jsx";
import { Spinner } from '../components/Spinner.jsx';

export function JobListing({ load, jobsData, totalJobs }) {
    return (
        <section className={stl.resBusqueda}>
            <h2>Resultados de búsqueda</h2>
            {/* <div className="select_person">
                <label className="label_num_result" htmlFor="num_result">
                    Número de resultados
                </label>
                <select name="num_result" id="num_result"></select>
            </div> */}
            <div className={stl.loadJobsSection}>
                {load && (
                    <Spinner />
                )}
                <div id="jobs-listings" className={stl.envResult}>
                    {totalJobs === 0 ? (
                        <p className={stl.notResults}>No se han encontrado empleos</p>
                    ) : (
                        jobsData.map(job => (
                            <JobCard key={job.id} job={job} />
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}

