"use client";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import { useState } from "react";
import {
  Globe,
  Mail,
  MapPin,
  Minus,
  Phone,
  Plus,
  Smartphone,
  SquareArrowOutUpRight,
  User,
} from "lucide-react";
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
                <h4 className={styles.triggerText}>{trigger.text}</h4>
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

        {selectedTab === 2 && <GMContactCard data={displayData()} />}
      </Container>
    </section>
  );
};

const GMContactCard = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Row className={`${styles.gmContactContainer}`}>
      {data.map((gmData, index) => (
        <Col
          data-aos="fade-up"
          data-aos-delay={index * 40}
          key={index}
          xs={12}
          md={6}
          className={styles.gmCol}
        >
          <div className={styles.accWrapper}>
            {/* Trigger */}
            <div
              className={styles.accTrigger}
              role="button"
              onClick={() => toggleItem(index)}
            >
              <div>{`${gmData.post}, ${gmData.district}`}</div>

              <div>{activeIndex === index ? <Minus /> : <Plus />}</div>
            </div>

            {/* Content */}
            <div
              className={`${styles.accContentWrapper} ${activeIndex === index ? styles.accActive : ""} `}
            >
              <div className={styles.accContent}>
                <div className={styles.accItem}>
                  <div>
                    <User />
                  </div>
                  <div>{gmData.name}</div>
                </div>

                <div className={styles.accItem}>
                  <div>
                    <MapPin />
                  </div>
                  <div>
                    {gmData.address.split(",").map((part, idx) => (
                      <div key={idx}>{part.trim()}</div>
                    ))}
                  </div>
                </div>

                <div className={styles.accItem}>
                  <div>
                    <Mail />
                  </div>
                  <a href={`mailto:${gmData.mail}`}>
                    <div className={styles.gmAnchor}>{gmData.mail}</div>
                  </a>
                </div>

                <div className={styles.accItem}>
                  <div>
                    <Phone />
                  </div>
                  <div>{gmData.tel}</div>
                </div>

                <div className={styles.accItem}>
                  <div>
                    <Smartphone />
                  </div>
                  <div>{gmData.mobile}</div>
                </div>

                <div className={styles.accItem}>
                  <div>
                    <Globe />
                  </div>
                  <a
                    href={gmData.website}
                    target="_self"
                    rel="noopener noreferrer"
                    aria-label={`Visit website: ${gmData.website}`}
                  >
                    <div className={styles.gmAnchor}>
                      {gmData.website.replace(/(^\w+:|^)\/\/(www\.)?/, "")}
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

const OrgContactCard = ({ name, address, tel, mail, website }) => {
  const location = [13.009730416701956, 80.21024319642622];
  return (
    <Row data-aos="fade-up" className={styles.orgContactCard}>
      <Col xs={12} md={6} className={styles.orgCol}>
        <h5 data-aos="fade-up" data-aos-delay={40}>
          {name}
        </h5>

        <div
          data-aos="fade-up"
          data-aos-delay={80}
          className={styles.orgCardItem}
        >
          <div>
            <MapPin />
          </div>
          <p>{address}</p>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay={120}
          className={styles.orgCardItem}
        >
          <div>
            <Phone />
          </div>
          <p>{tel}</p>
        </div>

        <div data-aos="fade-up" data-aos-delay={160} className={styles.orgMail}>
          <ContactArrowButton text="Send Mail" link={`mailto:${mail}`} />
        </div>

        <a
          data-aos="fade-up"
          data-aos-delay={200}
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
