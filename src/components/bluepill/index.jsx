import styles from "./bluepill.module.css"

export default function Bluepill({text}){
    return (
        <div data-aos="fade-up" className={styles.bluepill}>
            {text}
        </div>
    )
}