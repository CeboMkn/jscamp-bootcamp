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

    const applied = isApplied(jobId)
    const label = isLoggedIn ? (applied ? "Aplicado" : "Aplicar") : "Inicia Sesión"
    const className = isLoggedIn && applied ? stl.applied : ""

    return (
        <BtnGlobal className={className} onClick={handleApply} disabled={!isLoggedIn}>
            {label}
        </BtnGlobal>
    )
}
