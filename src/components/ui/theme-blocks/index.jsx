import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import Link from "next/link";
import Logo from "../logo";
import DynamicImage from "../../dynamicImage";
import { MoveRight } from "lucide-react";

const ThemeBlocks = ({ name, leftBlock, accordions }) => {
  return (
    <section className={styles.section}>
      <Row className={styles.themeRow}>
        {/*Left block */}
        <Col xs={12} md={5} className={styles.leftBlock}>
          <div className={styles.leftBlockHeader}>
            <Link href="/">
              <div className={styles.title}>FaMe TN</div>
            </Link>

            <div className={styles.subText}>Facilitating MSMEs Tamil Nadu</div>
          </div>

          <div className={styles.leftBlockRecos}>
            <div className={styles.recoHeader}>{name}</div>

            <div className={styles.recoDesc}>{leftBlock.description}</div>

            <div className={styles.recosSection}>
              <div className={styles.recoText}>Recomennded for you</div>

              <Row className={styles.pagesRow}>
                {leftBlock.recs.map((rec, index) => (
                  <Col key={index} xs={12} md={9} className={styles.pagesCol}>
                    <PageCard {...rec} index={index} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Col>

        {/* Right Block*/}
        <Col xs={12} md={6} className={styles.rightBlock}></Col>
      </Row>
    </section>
  );
};

const PageCard = ({
  pageTitle,
  pageDescription,
  pageLink,
  pageThumbnail,
  index,
}) => {
  return (
    <div className={styles.pagesFlex}>
      <div className={styles.pageThumbnail}>
        <DynamicImage src={pageThumbnail} objectFit="cover" />
      </div>

      <div className={styles.pageTitle}>{pageTitle}</div>

      <div className={styles.pageDescription}>{pageDescription}</div>

      <Link href={pageLink.url} className={styles.pageLink}>
        <span className={styles.pageLinkText}>{pageLink.text}</span>
        <span className={styles.pageLinkIcon}>
          {" "}
          <MoveRight />{" "}
        </span>
      </Link>
    </div>
  );
};

export default ThemeBlocks;
