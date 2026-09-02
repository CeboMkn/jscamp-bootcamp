import snarkdown from "snarkdown";
import stl from "./DetailJobSection.module.css"

export function DetailJobSection({ title, content }) {
    const htmlContent = snarkdown(content);

    return (
        <section className={stl.detailJobSection}>
            <h2>{title}</h2>
            <div
                className={`prose`}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </section>
    );
}