"use client";
import { Container } from "react-bootstrap";
import styles from "./styles.module.css";
import DynamicImage from "../../dynamicImage";
import { JustArrowButton } from "../../yellow_arrow_button";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Visibility } from "@mui/icons-material"; // Using Material UI icons
import Link from "next/link";

const Card = ({ name, description, image, ctaLink, index }) => {
  return (
    <div
      className={styles.card}
      data-aos="fade-left"
      data-aos-delay={index * 100}
    >
      <div className={styles.imageContainer}>
        <Link href={ctaLink}>
          <div className={styles.cardImageWrapper}>
            <DynamicImage src={image} objectFit="cover" />
          </div>
        </Link>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{name}</h3>
        <div className={styles.contentDetails}>
          <div className={styles.contentRow}>
            <span className={styles.contentLabel}>Description</span>
            <div className={styles.cardDescription}>{description}</div>
          </div>
          <div className={styles.contentRow}>
            <span className={styles.contentLabel}>Products</span>
            <div className={styles.cardCta}>
              <JustArrowButton text="Show All" link={ctaLink} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HorizontalScrollGrid = ({ cardsData }) => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setShowLeftArrow(container.scrollLeft > 20);
      setShowRightArrow(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 20,
      );
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.refresh();
    }
    handleScroll();
  }, [cardsData]);

  if (!cardsData || !Array.isArray(cardsData) || cardsData.length === 0) {
    return null;
  }

  return (
    <Container fluid className={styles.scrollGrid}>
      {showLeftArrow && (
        <button
          className={`${styles.scrollButton} ${styles.scrollButtonLeft}`}
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft fontSize="medium" />
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className={styles.scrollGridContainer}
        onScroll={handleScroll}
      >
        <div className={styles.cardsWrapper}>
          {cardsData.map((cardData, index) => {
            const data = cardData.attributes;
            const url = `/gi-products/${data.slug}`;
            return (
              <Card
                key={index}
                index={index}
                name={data.name}
                description={data.description}
                image={data.category_image}
                ctaLink={url}
              />
            );
          })}
        </div>
      </div>

      {showRightArrow && (
        <button
          className={`${styles.scrollButton} ${styles.scrollButtonRight}`}
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight fontSize="medium" />
        </button>
      )}
    </Container>
  );
};

export default HorizontalScrollGrid;
