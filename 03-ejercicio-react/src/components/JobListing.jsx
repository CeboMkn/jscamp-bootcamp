import { JobCard } from "./JobCard.jsx";
import { Spinner } from '../components/Spinner.jsx';

export function JobListing({ load, jobsData, totalJobs }) {
    return (
        <section className="sect_res_busqueda btn_active_contain">
            <h2>Resultados de búsqueda</h2>
            {/* <div className="select_person">
                <label className="label_num_result" htmlFor="num_result">
                    Número de resultados
                </label>
                <select name="num_result" id="num_result"></select>
            </div> */}
            <div className="loadJobsSection">
                {load && (
                    <Spinner />
                )}
                <div id="jobs-listings" className="env_result">
                    {totalJobs === 0 ? (
                        <p className="notResults">No se han encontrado empleos que coincidan con los criterios de búsqueda</p>
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

