import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import DynamicImage from "../dynamicImage";
export default function FatImage({ src }) {
    return (<Container className="my-4">
        <div data-aos="fade-up" className={styles.container}>
            <DynamicImage src={src} objectFit="contain" />
        </div>
    </Container>)
}