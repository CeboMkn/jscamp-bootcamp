import { useState } from "react"
import { useAuthstore } from "../../components/store/Authstore.js"
import { BtnGlobal } from "./BtnGlobal.jsx"
import { useAppliedStore } from "../../components/store/AppliedStore.js"
import stl from "./BtnGlobal.module.css"

export function AplyButton({ jobId }) {
    const { isLoggedIn } = useAuthstore()
    const { toggleApplied, isApplied } = useAppliedStore()

    const [isAplied, setIsAplied] = useState(isApplied(jobId))

    const handleApply = () => {
        setIsAplied(prev => !prev)
        toggleApplied(jobId)
    }

    return (
        <BtnGlobal className={isAplied ? stl.applied : ""} onClick={handleApply} disabled={!isLoggedIn}>
            {isAplied ? 'Aplicado' : 'Aplicar'}
        </BtnGlobal>
    )
}
