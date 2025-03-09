import Link from "next/link";
import styles from "./styles.module.css"


export default function EvButton({ link, text }) {
    function InnerContents() {
        return (<div className={styles.button} role="button">
            {text}
        </div>)
    }
    if (!link) {
        return (<InnerContents />)
    }
    return (
        <Link href={link || "#"}>
            <InnerContents />
        </Link>
    )
}