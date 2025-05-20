import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import ThemesLeftBlock from "./left-block";

const ThemeBlocks = ({ name, leftBlock, accordions }) => {
  return (
    <section className={styles.section}>
      <Row className={styles.themeRow}>
        {/*Left block */}
        <Col xs={12} md={5} className={styles.leftBlock}>
          <ThemesLeftBlock name={name} {...leftBlock} />
        </Col>

        {/* Right Block*/}
        <Col xs={12} md={6} className={styles.rightBlock}></Col>
      </Row>
    </section>
  );
};

export default ThemeBlocks;
