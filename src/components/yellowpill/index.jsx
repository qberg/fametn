import styles from "./yellowpill.module.css"

export default function YellowPill({text}){
    return (
        <div className={styles.yellowpill}>
            {text}
        </div>
    )
}