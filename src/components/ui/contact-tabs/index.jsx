"use client";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import { useState } from "react";

const triggerContant = [
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
      <Container className={styles.tabsContainer}>
        {/* Tabs Trigger */}
        <Row xs="auto" md="auto" className={styles.tabsTriggerRow}>
          {triggerContant.map((content, index) => (
            <Col key={index} className={styles.tabsTriggerCol}>
              <div
                className={`${styles.tabButton} ${selectedTab === index ? styles.activeTab : ""}`}
                role="button"
                onClick={() => handleTabClick(index)}
                onKeyDown={(e) => e.key === "Enter" && handleTabClick(index)}
                tabIndex={0}
              >
                <h5 className={styles.triggerText}>{content.text}</h5>
              </div>
            </Col>
          ))}
        </Row>

        <pre>{JSON.stringify(displayData(), null, 2)}</pre>
      </Container>
    </section>
  );
};

export default ContactTabs;
