import { Col, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import ThemesLeftBlock from "./left-block";
import { useState, useEffect } from "react";
import { Minus, MoveUpRight, Plus } from "lucide-react";
import useMeasure from "react-use-measure";

const AccordionItem = ({
  accordion,
  isControlled,
  masterIsOpen,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, { height }] = useMeasure();

  useEffect(() => {
    if (isControlled) {
      setIsOpen(masterIsOpen);
    }
  }, [isControlled, masterIsOpen]);

  const toggleAccordion = () => {
    const newState = !isOpen;
    setIsOpen(newState);

    if (onOpenChange) {
      onOpenChange(newState);
    }
  };

  return (
    <div className={styles.accWrapper}>
      {/* Trigger */}
      <div
        role="button"
        className={styles.accTrigger}
        onClick={toggleAccordion}
      >
        <div className={styles.accQuestion}>{accordion.question}</div>
        <div className={styles.accIcon}>{isOpen ? <Minus /> : <Plus />}</div>
      </div>

      {/* Content */}
      <div
        className={styles.accContentWrapper}
        style={{
          height: isOpen ? height : 0,
          transition: "height 0.3s ease-in-out",
        }}
      >
        <div ref={ref} className={styles.accContent}>
          {accordion.answerParas && (
            <div className={styles.accParas}>
              {accordion.answerParas.map((item, idx) => (
                <div key={idx} className={styles.accPara}>
                  {item.para}
                </div>
              ))}
            </div>
          )}

          {accordion.listHeading && (
            <div className={styles.accListHeading}>{accordion.listHeading}</div>
          )}

          {accordion.list && (
            <div className={styles.accListicles}>
              {accordion.list.map((listItem, index) => (
                <div key={index} className={styles.accListItem}>
                  {listItem.item}
                </div>
              ))}
            </div>
          )}

          {accordion.links && (
            <div className={styles.accListicles}>
              {accordion.links.map((linkItem, idx) => (
                <div key={idx} className={styles.accListItem}>
                  <span>{linkItem.preText}</span>{" "}
                  <a href={linkItem.link}>
                    <span className={styles.accLinkText}>
                      {linkItem.linkText}
                    </span>
                    <span className={styles.accLinkIcon}>
                      <MoveUpRight />
                    </span>
                  </a>{" "}
                  <span>{linkItem.postText}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ThemeBlocks = ({ name, leftBlock, accordions }) => {
  const [masterIsOpen, setMasterIsOpen] = useState(false);

  const [openCount, setOpenCount] = useState(0);

  const handleAccordionChange = (isOpen) => {
    setOpenCount((prevCount) => (isOpen ? prevCount + 1 : prevCount - 1));
  };

  const toggleAllAccordions = () => {
    const newState = openCount === 0;
    setMasterIsOpen(newState);
    setOpenCount(newState ? accordions.length : 0);
  };

  return (
    <section className={styles.section}>
      <Row className={styles.themeRow}>
        {/* Left block */}
        <Col xs={12} md={5} className={styles.leftBlock}>
          <ThemesLeftBlock name={name} {...leftBlock} />
        </Col>

        {/* Right Block */}
        <Col xs={12} md={7} className={styles.rightBlock}>
          <div className={styles.headerFlex}>
            <div>Language</div>
          </div>

          {accordions && accordions.length > 0 && (
            <div className={styles.accordionFlex}>
              <div className={styles.accordionsToggle}>
                <div
                  role="button"
                  className={styles.accordionsToggleTrigger}
                  onClick={toggleAllAccordions}
                >
                  {openCount > 0 ? "Close All" : "Open All"}
                </div>
              </div>

              {accordions.map((accordion, index) => (
                <AccordionItem
                  key={index}
                  accordion={accordion}
                  isControlled={true}
                  masterIsOpen={masterIsOpen}
                  onOpenChange={handleAccordionChange}
                />
              ))}
            </div>
          )}
        </Col>
      </Row>
    </section>
  );
};

export default ThemeBlocks;
