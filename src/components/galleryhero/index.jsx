import { Container } from "react-bootstrap"
import styles from "./styles.module.css"
import DynamicImage from "../dynamicImage"

export default function GalleryHero({ heading, banner }) {
    return (<Container className={styles.banner} fluid>
        <div className={styles.bannerholder}>
            <DynamicImage src={banner} objectFit="cover"  />
        </div>
        <div className="position-relative z-1">
            <h1 data-aos="fade-up" className={styles.heading}>
                {heading}
            </h1>
        </div>
    </Container>)
}