import { Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import HorizontalScrollGrid from "../horizontal-scroll-grid";

const GICategoriesGrid = ({ heading, description, categories }) => {
  return (
    <section className={styles.categoriesSection}>
      <Container fluid className={styles.headerContainer}>
        <div className={styles.header}>
          <div className={styles.heading} data-aos="fade-up">
            {heading}
          </div>
          <div
            className={styles.description}
            data-aos="fade-up"
            data-aos-delay={100}
          >
            {description}
          </div>
        </div>
      </Container>
      <HorizontalScrollGrid cardsData={categories} />
    </section>
  );
};

export default GICategoriesGrid;

{
  /*
      <pre>{JSON.stringify(categories, null, 2)}</pre> */
}
