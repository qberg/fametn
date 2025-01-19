import { Container } from "react-bootstrap"
import styles from "./styles.module.css"

const YellowFancyContainer = ({children}) => {
    return (
        <Container className={styles.bgclass} fluid>
            <Container className="z-2 position-relative">
                {children}
            </Container>
        </Container>
    )
}

module.exports = YellowFancyContainer