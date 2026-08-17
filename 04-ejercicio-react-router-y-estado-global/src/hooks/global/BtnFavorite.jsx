import { useAuthstore } from "../../components/store/Authstore"
import { useFavoritesStore } from "../../components/store/favoritesStore"
import styles from './BtnFavorite.module.css'

export function BtnFavorite({ jobId }) {

    const { isLoggedIn } = useAuthstore()
    const { isFavorite, toggleFavorite } = useFavoritesStore()

    if (!isLoggedIn) return null

    return (
        <button
            className={styles.btnFavorite}
            onClick={() => toggleFavorite(jobId)}
            type="button"
        >
            {isFavorite(jobId)
                ? <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d70f0f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-heart-check"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M19.5 12.572l-3 2.928m-5.5 3.5a8916.99 8916.99 0 0 0 -6.5 -6.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                    <path d="M15 19l2 2l4 -4" />
                </svg>
                : <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-heart-plus"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 20l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.96 6.053" />
                    <path d="M16 19h6" />
                    <path d="M19 16v6" />
                </svg>
            }
        </button>
    )
}