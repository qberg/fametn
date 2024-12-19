import styles from "./bluepill.module.css"

export default function Bluepill({text}){
    return (
        <div className={styles.bluepill}>
            {text}
        </div>
    )
}