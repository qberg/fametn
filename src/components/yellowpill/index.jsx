import styles from "./yellowpill.module.css"

export default function YellowPill({text}){
    return (
        <div data-aos="fade-up" className={styles.yellowpill}>
            {text}
        </div>
    )
}