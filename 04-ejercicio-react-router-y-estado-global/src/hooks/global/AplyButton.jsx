import { useAuthstore } from "../../components/store/Authstore"
import { BtnGlobal } from "./BtnGlobal"

export function AplyBytton() {
    const { isLoggedIn } = useAuthstore()
    return (
        <BtnGlobal disabled={!isLoggedIn}>
            Aplicar
        </BtnGlobal>
    )
}
