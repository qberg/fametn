import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const MinimalSchemesBlock = ({ header, cta, schemes }) => {
  return (
    <section className="margin">
      <Container>
        <div className={styles.wrapper} data-aos="fade-up">
          {header && (
            <Row>
              <Col xs={12}>
                <center>
                  <h2 data-aos="fade-up">{header.heading}</h2>
                  <p data-aos="fade-up" className={styles.secDesc}>
                    {header.description}
                  </p>
                </center>
              </Col>
            </Row>
          )}
          {schemes.data?.length > 0 && (
            <Row className={styles.schemesRow}>
              {schemes.data.map((scheme, index) => {
                const { scheme_name, scheme_description, scheme_link, icon } =
                  scheme.attributes;
                return (
                  <Col key={index} xs={12} md={4} className={styles.schemeCol}>
                    <SpreadColorCard
                      index={index}
                      icon={icon}
                      title={scheme_name}
                      description={scheme_description}
                      ctaLink={`/schemes/${scheme_link}`}
                    />
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      </Container>
    </section>
  );
};

const SpreadColorCard = ({ index, icon, title, description, ctaLink }) => {
  const customPath = icon?.data?.attributes?.formats?.small?.url;
  const iconPath = customPath
    ? process.env.NEXT_PUBLIC_IMG_ENDPOINT + customPath
    : "/default_scheme.webp";

  return (
    <Link href={ctaLink}>
      <div
        className={styles.card}
        data-aos="fade-up"
        data-aos-delay={100 * index}
      >
        <div className={styles.iconWrapper}>
          <div className={styles.icon} data-aos="fade-up">
            <Image
              height={75}
              width={75}
              src={iconPath}
              alt={`Icon of ${title}`}
            />
          </div>
        </div>

        <div className={styles.content} data-aos="fade-up">
          <div className={styles.title} data-aos="fade-up">
            {" "}
            {title}
          </div>
          <div className={styles.description} data-aos="fade-up">
            {description}
          </div>
        </div>

        <div className={styles.arrow} data-aos="fade-up">
          <ArrowRight size={24} />
        </div>
      </div>
    </Link>
  );
};

export default MinimalSchemesBlock;
