/* Aquí va la lógica para dar funcionalidad al botón de "Aplicar" */
const contain_btn = document.querySelector('.btn_active_contain')

contain_btn?.addEventListener('click', (e) => {
    const element = e.target
    if (element.classList.contains('btn_active')) {
        element.textContent = '¡Aplicado!'
        element.disabled = true
        element.style.backgroundColor = 'green'
    }
})