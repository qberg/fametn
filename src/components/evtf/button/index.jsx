import Link from "next/link";
import styles from "./styles.module.css"


export default function EvButton ({link, text}) {
    return (
        <Link href={link || "#"}>
            <div className={styles.button} role="button">
            {text}
            </div>
        </Link>
    )
}