import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";

import Breadcrumps from "@/components/breadcrumps";
import DynamicImage from "@/components/dynamicImage";
import Link from "next/link";
import YellowArrowButton from "../yellow_arrow_button";
import { ChevronRight } from "lucide-react";

const NavigableHero = ({
  title,
  description,
  ctaLink,
  ctaText,
  navSections,
  bgImage,
  breadcrumps,
}) => {
  return (
    <section className={styles.heroSection}>
      {breadcrumps && <Breadcrumps items={breadcrumps} />}
      <Container>
        <div className={styles.bgImage} data-aos="fade-up">
          <DynamicImage src={bgImage} objectFit="cover" />
        </div>

        <Row className={styles.cardRow}>
          <Col xs={12} md={{ span: 10, offset: 1 }} className={styles.cardCol}>
            <div className={styles.cardFlex} data-aos="fade-up">
              {/* Top part flex */}
              <div className={styles.cardInfo} data-aos="fade-up">
                {/* title and description */}
                <div className={styles.cardHeader}>
                  <h1 className={styles.title} data-aos="fade-up">
                    {title}
                  </h1>

                  <p data-aos="fade-up" className={styles.desc}>
                    {description}
                  </p>
                </div>

                {/*scroll links */}
                {navSections.length > 0 && (
                  <div className={styles.cardMenu}>
                    {navSections.map((item, index) => (
                      <div
                        data-aos="fade-up"
                        data-aos-delay={100 * index}
                        key={index}
                        className={styles.menuItem}
                      >
                        <Link
                          href={`#${item.sectionId}`}
                          className={styles.link}
                        >
                          <h5 data-aos="fade-up">{item.linkText}</h5>
                          <div data-aos="fade-up" className={styles.icon}>
                            <ChevronRight />
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/*cta flex */}
              <div className={styles.ctaFlex} data-aos="fade-up">
                <YellowArrowButton
                  text={ctaText}
                  link={ctaLink || "/contact"}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NavigableHero;
