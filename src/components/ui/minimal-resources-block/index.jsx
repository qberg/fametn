import { DownloadIcon } from "lucide-react";
import YellowArrowButton from "../../yellow_arrow_button";
import styles from "./styles.module.css";
import { Col, Container, Row } from "react-bootstrap";
import DownloadButton from "../download-button";

const attachmentBaseURL = process.env.NEXT_PUBLIC_ATTACHMENT_API_ENDPOINT;

const MinimalResourcesBlock = ({ title, resources }) => {
  if (!resources?.data?.length) return null;

  return (
    <section className={`${styles.section} margin`}>
      <Container>
        {title && (
          <center>
            <h2 data-aos="fade-up">{title}</h2>
          </center>
        )}

        <Row className={styles.resRow}>
          {resources.data.map((resource, index) => {
            const { attributes } = resource;
            const attachmentUrl = attributes.attachment?.data?.attributes?.url;

            return (
              <Col key={index} xs={12} md={6} className={styles.resCol}>
                <div
                  className={styles.card}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                >
                  <h4 data-aos="fade-up" className={styles.traAnim}>
                    {attributes.title}
                  </h4>
                  <p
                    className={`${styles.cardDesc} ${styles.traAnim}`}
                    data-aos="fade-up"
                  >
                    {attributes.description}
                  </p>
                  {attachmentUrl && (
                    <DownloadButton
                      ctaLink={`${attachmentBaseURL}${attachmentUrl}`}
                      ctaText="Download"
                    />
                  )}
                </div>
              </Col>
            );
          })}

          <Col className={styles.resCta} data-aos="fade-up" xs={12}>
            <YellowArrowButton text="View All" link="/resources" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MinimalResourcesBlock;
