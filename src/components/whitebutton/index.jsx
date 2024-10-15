import Link from "next/link"
import styles from "./whitebutton.module.css"

const WhiteButton = ({ text, link }) => {
    return (
        <Link href={link || "/"}>
            <div className={styles.btn}>
                {text}
            </div>
        </Link>)
}

module.exports = WhiteButton;