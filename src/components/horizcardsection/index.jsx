import { Container } from "react-bootstrap";
import styles from "./horixcardsection.module.css";

const HorizCardSection = ({title, data}) => {
    return (
        <Container className="py-5 my-5">
            <h3>
                {title.title}
            </h3>

            <div className="d-none d-md-flex">
                <div>
                    
                </div>
            </div>
        </Container>
    )
}

module.exports = HorizCardSection;