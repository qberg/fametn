"use client";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import { useState } from "react";
import { MapPin, Phone, SquareArrowOutUpRight } from "lucide-react";
import { ContactArrowButton } from "@/components/ui/contact-arrow-button";
import dynamic from "next/dynamic";

const LazyMap = dynamic(() => import("@/components/ui/contact-map"), {
  ssr: false,
  loading: () => <div className={styles.mapLoading}>Loading map...</div>,
});

const triggerContent = [
  {
    text: "Fame TN HQ",
  },
  {
    text: "ICDIC HQ",
  },
  {
    text: "Regional Officials",
  },
];

const ContactTabs = ({ fametn, icdic, officials }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  const displayData = () => {
    switch (selectedTab) {
      case 0:
        return fametn;
      case 1:
        return icdic;
      case 2:
        return officials;
      default:
        return fametn;
    }
  };

  return (
    <section className={styles.tabsSection}>
      {/* Tabs Trigger */}
      <Container className={styles.tabsContainer}>
        <Row
          data-aos="fade-up"
          xs="auto"
          md="auto"
          className={styles.tabsTriggerRow}
        >
          {triggerContent.map((trigger, index) => (
            <Col key={index} className={styles.tabsTriggerCol}>
              <div
                className={`${styles.tabButton} ${selectedTab === index ? styles.activeTab : ""}`}
                role="button"
                onClick={() => handleTabClick(index)}
                onKeyDown={(e) => e.key === "Enter" && handleTabClick(index)}
                tabIndex={0}
              >
                <h3 className={styles.triggerText}>{trigger.text}</h3>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Tabs Content */}
      <Container className={styles.tabsContentContainer}>
        {(selectedTab === 0 || selectedTab === 1) && (
          <OrgContactCard {...displayData()} />
        )}

        {selectedTab === 2 && (
          <pre>{JSON.stringify(displayData(), null, 2)}</pre>
        )}
      </Container>
    </section>
  );
};

const OrgContactCard = ({ name, address, tel, mail, website }) => {
  const location = [13.009730416701956, 80.21024319642622];
  return (
    <Row className={styles.orgContactCard}>
      <Col xs={12} md={6} className={styles.orgCol}>
        <h5>{name}</h5>

        <div className={styles.orgCardItem}>
          <div>
            <MapPin />
          </div>
          <p>{address}</p>
        </div>

        <div className={styles.orgCardItem}>
          <div>
            <Phone />
          </div>
          <p>{tel}</p>
        </div>

        <div className={styles.orgMail}>
          <ContactArrowButton text="Send Mail" link={`mailto:${mail}`} />
        </div>

        <a
          href={website}
          target="_self"
          rel="noopener noreferrer"
          aria-label={`Visit website: ${website}`}
        >
          <div className={styles.orgWeb}>
            <p>Visit Website</p>
            <div>
              <SquareArrowOutUpRight />
            </div>
          </div>
        </a>
      </Col>

      <Col xs={12} md={6} className={styles.orgMapCol}>
        <LazyMap location={location} popupText={name} />
      </Col>
    </Row>
  );
};

export default ContactTabs;
