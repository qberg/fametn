import Link from "next/link";
import DynamicImage from "../../../dynamicImage";
import { MoveRight } from "lucide-react";
import { Col, Row } from "react-bootstrap";

import styles from "./styles.module.css";

const ThemesLeftBlock = ({ name, description, recs }) => {
  return (
    <>
      <div className={styles.leftBlockHeader}>
        <Link href="/">
          <div className={styles.title}>FaMe TN</div>
        </Link>

        <div className={styles.subText}>Facilitating MSMEs Tamil Nadu</div>
      </div>

      <div className={styles.leftBlockRecos}>
        <div className={styles.recoHeader}>{name}</div>

        <div className={styles.recoDesc}>{description}</div>

        <div className={styles.recosSection}>
          <div className={styles.recoText}>Recomennded for you</div>

          <Row className={styles.pagesRow}>
            {recs.map((rec, index) => (
              <Col key={index} xs={12} md={9} className={styles.pagesCol}>
                <PageCard {...rec} index={index} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </>
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

export default ThemesLeftBlock;
