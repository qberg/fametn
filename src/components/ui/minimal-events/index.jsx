import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import YellowArrowButton from "../../yellow_arrow_button";
import { Calendar, ExternalLink, MapPin } from "lucide-react";

const MinimalEvents = ({ events, title, description }) => {
  if (!events || events.length === 0) {
    return null;
  }
  return (
    <section className="margin">
      <Container>
        <Row className={styles.contentRow}>
          <Col
            xs={{ span: 12, order: 1 }}
            md={{ span: 5, order: 1 }}
            data-aos="fade-up"
          >
            <div className={styles.contentFlex} data-aos="fade-up">
              <h2 data-aos="fade-up">{title}</h2>

              <p data-aos="fade-up">{description}</p>

              <div className={styles.ctaDeskFlex} data-aos="fade-up">
                <YellowArrowButton text="View More" link="/events" />
              </div>
            </div>
          </Col>

          {/*Events */}
          <Col
            xs={{ span: 12, order: 2 }}
            md={{ span: 6, order: 2, offset: 1 }}
            className={styles.eventCol}
            data-aos="fade-up"
          >
            <div className={styles.eventsFlex} data-aos="fade-up">
              {events.map((event, index) => (
                <EventBookMarkCard key={index} {...event} index={index} />
              ))}
            </div>
          </Col>

          <Col
            xs={{ span: 12, order: 3 }}
            className={styles.ctaMobileFlex}
            data-aos="fade-up"
          >
            <YellowArrowButton text="View More" link="/events" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const EventBookMarkCard = ({
  index,
  start_date,
  end_date,
  title,
  description,
  location,
  registration_link,
}) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    return {
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "long" }),
      year: date.getFullYear(),
    };
  };

  const { day: startDay, month: startMonth, year } = formatDate(start_date);
  const { day: endDay } = formatDate(end_date);

  const duration = `${startDay}-${endDay} ${startMonth} ${year}`;

  return (
    <article
      className={styles.card}
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      <div className={styles.bookmark}>
        <span className={styles.bookmarkDay} data-aos="fade-up">
          {startDay}
        </span>
        <span className={styles.bookmarkMonth} data-aos="fade-up">
          {startMonth}
        </span>
      </div>

      <div className={styles.eventContent}>
        <a
          href={registration_link || "/events"}
          target="_blank"
          rel="noopener noreferrer"
          data-aos="fade-up"
        >
          <div className={`${styles.eventTitle} niceTitle`}>
            <span>{title}</span>
            <span className={styles.externalLinkIcon}>
              <ExternalLink size={20} />{" "}
            </span>
          </div>
        </a>

        {description && (
          <div data-aos="fade-up" className={`${styles.eventDesc} niceDesc`}>
            {description}
          </div>
        )}

        <div className={styles.eventSchedule}>
          <div className={styles.eventMeta}>
            <span data-aos="fade-up" className={styles.icon}>
              <Calendar size={18} />
            </span>

            <span data-aos="fade-up">{duration}</span>
          </div>

          <div className={styles.eventMeta}>
            <span data-aos="fade-up" className={styles.icon}>
              <MapPin size={18} />
            </span>
            <span data-aos="fade-up">{location}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MinimalEvents;
