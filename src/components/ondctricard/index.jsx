import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import DynamicImage from "../dynamicImage";
export default function OndcTriCard({ header, cards }) {

    const Card = ({ index }) => {
        const item = cards[index]
        return (<>
            <div className={styles.icon}>
                <DynamicImage src={item.image} objectFit="contain" />
            </div>
            <div className="mt-4">
                <h4>
                    {item.heading}
                </h4>
                <p className="small">
                    {item.description}
                </p>
            </div>
        </>)
    }
    return (
        <Container className="mt-5 py-5">
            <h2 data-aos="fade-up">
                {header.heading}
            </h2>
            <p data-aos="fade-up">
                {header.description}
            </p>
            <div className="d-none d-lg-flex my-4 ">
                <div data-aos="fade-up" data-aos-delay={0} className={styles.left}>
                    <Card index={0} />
                </div>
                <div data-aos="fade-up" data-aos-delay={100} className={styles.mid}>
                    <Card index={1} />
                </div>
                <div data-aos="fade-up" data-aos-delay={200} className={styles.right}>
                    <Card index={2} />
                </div>
            </div>
            <div className="d-block d-lg-none mt-5">
                {cards.map((_, index) => {
                    return (
                        <div key={index} className={styles.mobcard}>
                            <Card index={index} key={index} />
                        </div>
                    )
                })}
            </div>
        </Container>)
}