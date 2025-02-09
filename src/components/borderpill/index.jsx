import Link from "next/link"
import styles from "./styles.module.css"

export default function BorderPill({ text, link }) {
    const Inner = () => {
        return (
            <div data-aos="fade-up" className={styles.bluepill}>
                {text}
            </div>
        )
    }
    return link ? (
        <Link href={link}>
            <Inner />
        </Link>
    ) : (<Inner />)
}