import { useAuthstore } from "../../components/store/Authstore.js"
import { BtnGlobal } from "./BtnGlobal.jsx"
import { useAppliedStore } from "../../components/store/AppliedStore.js"
import stl from "./BtnGlobal.module.css"

export function AplyButton({ jobId }) {
    const { isLoggedIn } = useAuthstore()
    const { toggleApplied, isApplied } = useAppliedStore()

    const handleApply = () => {
        toggleApplied(jobId)
    }

    const label = isLoggedIn ? (isApplied(jobId) ? 'Aplicado' : 'Aplicar') : 'Inicia Sesión'

    return (
        <BtnGlobal className={isApplied(jobId) ? stl.applied : ""} onClick={handleApply} disabled={!isLoggedIn}>
            {label}
        </BtnGlobal>
    )
}
