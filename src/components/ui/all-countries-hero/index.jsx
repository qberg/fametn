"use state";

import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import React, { useEffect, useRef, useState } from "react";
import CountryCard from "../country-card";

const AllCountriesHero = ({ regions }) => {
  const [activeTab, setActiveTab] = useState(null);
  const sectionRefs = useRef({});

  useEffect(() => {
    sectionRefs.current = regions.reduce((acc, region) => {
      acc[region.id] = sectionRefs.current[region.id] || React.createRef();
      return acc;
    }, {});
  }, [regions]);

  const handleTabClick = (regionId) => {
    setActiveTab(regionId);

    if (
      sectionRefs.current[regionId] &&
      sectionRefs.current[regionId].current
    ) {
      const sectionElement = sectionRefs.current[regionId].current;

      const headerOffset = 5;
      const elementPosition = sectionElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const getCountriesForRegion = (region) => {
    return region?.attributes.countries?.data || [];
  };

  return (
    <>
      <section className={styles.hero}>
        <Container className="mt-5">
          <Row className={styles.heroRow}>
            <Col md={12}>
              <h1 className={styles.title} data-aos="fade-up">
                Target Markets All Regions
              </h1>
            </Col>
            <Col md={12} className={styles.tabCol}>
              <div className={styles.regionTabs} data-aos="fade-up">
                {regions.map((region, index) => (
                  <button
                    key={region.id}
                    className={`${styles.tab} ${activeTab === region.id ? styles.activeTab : ""}`}
                    onClick={() => handleTabClick(region.id)}
                    data-aos="fade-up"
                    data-aos-delay={100 * index}
                  >
                    {region.attributes.name}
                  </button>
                ))}
              </div>
            </Col>
            <Col md={6} className={styles.contentCol}>
              <p data-aos="fade-up">
                Find the answers you need on your target export market,
                including doing business, tax rates and import regulations.
                Filter by sector to see the markets best suited to your product
                or service.
              </p>
              <p data-aos="fade-up" data-aos-delay={100}>
                Which country would you like to read more about? Select your
                target market and find current information and events, practical
                support and the right contacts.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <div className={styles.regions}>
        <Container>
          {regions.map((region) => (
            <section
              key={region.id}
              ref={sectionRefs.current[region.id]}
              id={`region-${region.id}`}
              className={styles.regionSection}
            >
              <h2 className={styles.regionTitle} data-aos="fade-up">
                {region.attributes.name}
              </h2>
              <Row className={styles.countriesRow}>
                {getCountriesForRegion(region).map((country, index) => (
                  <Col
                    key={country.id}
                    lg={4}
                    md={6}
                    sm={6}
                    className={styles.countryCol}
                  >
                    <CountryCard {...country.attributes} index={index} />
                  </Col>
                ))}
              </Row>
            </section>
          ))}
        </Container>
      </div>
    </>
  );
};

export default AllCountriesHero;
