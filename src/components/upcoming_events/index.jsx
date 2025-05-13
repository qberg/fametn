import { Col, Container, Row } from "react-bootstrap";
import Bluepill from "../bluepill";
import styles from "./upcoming_events.module.css";
import YellowArrowButton from "../yellow_arrow_button";
import { useRouter } from "next/router";
import DynamicImage from "../dynamicImage";
import { useRef } from "react";
import EventPopup from "../eventpopup";

const strings = {
  all: {
    en: "View All",
    ta: "அனைத்தும் பார்",
  },
  register: {
    en: "Register",
    ta: "பதிவு செய்க",
  },
};

const formatDate = (date) => {
  // convert date from "2024-12-24" to dd MMM YYYY
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export function EventCard({ data }) {
  const { locale } = useRouter();
  const dateString =
    formatDate(data.start_date) +
    (data.end_date ? " - " + formatDate(data.end_date) : "");
  return (
    <div data-aos="fade-up" className={styles.eventcard}>
      <Row className=" h-100 g-x-4 g-y-2">
        <Col className={styles.nomb} lg={5}>
          <div className={styles.eventcardimg}>
            <DynamicImage src={data.image} objectFit="cover" />
          </div>
        </Col>
        <Col className={styles.nomb} lg={7}>
          <div className="d-flex h-100 flex-column">
            <p className={`mt-2 mt-lg-0 mb-1 ${styles.eventcardtitle}`}>
              {data.title}
            </p>
            <div className="small">
              <div>{dateString}</div>
              <div>{data.location}</div>
            </div>
            <div className="mt-auto pt-2">
              <YellowArrowButton
                text={strings.register[locale]}
                link={data.registration_link}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default function UpcomingEvents({ meta, data }) {
  const { locale } = useRouter();

  const popupRef = useRef();

  const showPopup = (data) => {
    popupRef.current.showItem(data);
  };
  return (
    <>
      {data.length > 0 && (
        <Container className="my-5">
          <div className="py-2">
            {meta.supertitle_2 && <Bluepill text={meta.supertitle_2} />}
            <h2 data-aos="fade-up" className="mt-3">
              {meta.title_2}
            </h2>
            <Row data-aos="fade-up">
              <Col md={10} xs={12}>
                {meta.description_2}
              </Col>
              <Col md={2} className="d-none d-md-flex justify-content-end">
                <YellowArrowButton
                  text={strings.all[locale]}
                  link="/events/search"
                />
              </Col>
              <Col xs={12} className="d-flex d-md-none">
                <YellowArrowButton
                  text={strings.all[locale]}
                  link="/events/search"
                />
              </Col>
            </Row>
            <hr></hr>
            <Row className="mt-5">
              {data.map((each, index) => {
                return (
                  <Col onClick={() => showPopup(each)} md={6} key={index}>
                    <EventCard data={each} />
                  </Col>
                );
              })}
            </Row>
            <EventPopup ref={popupRef} />
          </div>
        </Container>
      )}
    </>
  );
}

