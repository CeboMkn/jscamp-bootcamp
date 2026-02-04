import { useContactForm } from "../hooks/contact/useContactForm.jsx"
import styles from "../css_module/Contact.module.css"

export function ContactPage() {

    const {
        values,
        errors,
        sendStatus,
        showValidation,
        handleChange,
        handleSubmit
    } = useContactForm()

    return (
        <main className="main_estrecho">
            <div className={styles.contactCenter}>
                <div className={styles.textPrincipal}>
                    <h1>¿Tienes alguna pregunta?</h1>
                    <h3>Ponte en contacto con nosotros</h3>
                </div>
                <section className={styles.formContact}>
                    <form onSubmit={handleSubmit}>

                        <section className={styles.formLabels}>
                            <div>
                                <div
                                    className={`
                                    ${styles.inputFormContact}
                                    ${showValidation && errors.name ? styles.errorContainer : ''}
                                    ${showValidation && !errors.name && values.name.trim() !== '' ? styles.successContainer : ''}`}>
                                    <input
                                        name="name"
                                        placeholder="Nombre"
                                        type="text"
                                        value={values.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                {showValidation && errors.name && (
                                    <div className={styles.errorMessage}>
                                        <p>Campo obligatorio</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div
                                    className={`
                                    ${styles.inputFormContact}
                                    ${showValidation && errors.subname ? styles.errorContainer : ''}
                                    ${showValidation && !errors.subname && values.subname.trim() !== '' ? styles.successContainer : ''}`}>
                                    <input
                                        name="subname"
                                        placeholder="Apellidos"
                                        type="text"
                                        value={values.subname}
                                        onChange={handleChange}
                                    />
                                </div>

                                {showValidation && errors.subname && (
                                    <div className={styles.errorMessage}>
                                        <p>Campo obligatorio</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div
                                    className={`
                                    ${styles.inputFormContact}
                                    ${showValidation && errors.email ? styles.errorContainer : ''}
                                    ${showValidation && !errors.email && values.email.trim() !== '' ? styles.successContainer : ''}`}>
                                    <input
                                        name="email"
                                        placeholder="Correo electrónico"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                {showValidation && errors.email && (
                                    <div className={styles.errorMessage}>
                                        <p>Campo vacío o email inválido</p>
                                    </div>
                                )}
                            </div>

                        </section>
                        <section>
                            <div className={styles.sectionTextArea}>
                                <div
                                    className={`
                                    ${styles.inputFormContact}
                                    ${styles.textAreaFormContact}
                                    ${showValidation && errors.dudas ? styles.errorContainer : ''}
                                    ${showValidation && !errors.dudas && values.dudas.trim() !== '' ? styles.successContainer : ''}`}>
                                    <textarea
                                        name="dudas"
                                        placeholder="Cuéntanos tus dudas"
                                        value={values.dudas}
                                        onChange={handleChange}
                                    />
                                </div>

                                {showValidation && errors.dudas && (
                                    <div className={styles.errorMessage}>
                                        <p>Campo obligatorio</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section>
                            <div className={styles.btnEnviar}>
                                <button type="submit" className="btn_info" disabled={sendStatus === 'enviando' || sendStatus === 'enviado'} >
                                    {sendStatus === 'enviar' && 'Enviar'}
                                    {sendStatus === 'enviando' && 'Enviando...'}
                                    {sendStatus === 'error' && 'Error al enviar, pruebe más tarde'}
                                    {sendStatus === 'enviado' && 'Enviado :)'}
                                </button>
                            </div>
                        </section>

                    </form>
                </section>

            </div>
        </main>
    )
}