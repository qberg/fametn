import DynamicImage from "../../dynamicImage";
import styles from "./styles.module.css";
import { Col, Container, Row } from "react-bootstrap";
import YellowArrowButton from "@/components/yellow_arrow_button";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const ContentHero = ({ title, description, bgImage, dropdown, ctaText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ctaLink, setCtaLink] = useState(null);
  const [triggerBoxText, setTriggerBoxText] = useState("I would like to...");
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "Enter" || e.key === " ") {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (link, text) => {
    setCtaLink(link);
    setTriggerBoxText(text);
  };

  return (
    <section className={styles.heroSection}>
      <Container>
        <div className={styles.bgImage}>
          <DynamicImage src={bgImage} objectFit="cover" />
        </div>

        <Row className={styles.contentRow}>
          <Col
            xs={12}
            md={{ span: 5, offset: 1 }}
            className={styles.contentCol}
          >
            <h2>{title}</h2>

            <p>{description}</p>

            {dropdown.length > 0 && (
              <div ref={dropdownRef} className={styles.dropdown}>
                <div
                  className={styles.dropdownTrigger}
                  role="button"
                  onClick={() => setIsOpen(!isOpen)}
                  onKeyDown={handleKeyDown}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                >
                  <div
                    className={`${styles.triggerBoxText} ${isOpen ? styles.open : ""} `}
                  >
                    {triggerBoxText}
                  </div>

                  <div
                    className={`${styles.dropdownIcon} ${isOpen ? styles.open : ""}`}
                  >
                    <ChevronDown />{" "}
                  </div>

                  <div
                    className={`${styles.dropdownMenu} ${isOpen ? styles.open : ""}`}
                  >
                    {dropdown.map((item, index) => (
                      <div
                        key={index}
                        className={styles.menuItem}
                        onClick={() => handleSelect(item.url, item.text)}
                      >
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.dropdownCta}>
                  <YellowArrowButton
                    text={ctaText}
                    link={ctaLink ? ctaLink : "/schemes"}
                    disabled={!ctaLink}
                  />
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContentHero;
