import React, { useState } from "react";
import { JSONData } from "@/utils/definitions";

import styles from "./faq.module.css";
import Image from "next/image";

const FaqSection = ({ question, answer }: JSONData) => {
  const [opened, setOpened] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggleAnswer = () => {
    setOpened(!opened);
  };

  const handleMouseEnter = () => {
    if (!opened) {
      setHovered(true); //
    }
  };

  const handleMouseLeave = () => {
    if (!opened) {
      setHovered(false);
    }
  };

  return (
    <div
      className={`${styles["faq-section"]} ${opened ? styles["opened"] : ""}`}
    >
      <div
        className={`${styles["toggle-button"]} ${hovered ? styles["hovered"] : ""} ${opened ? styles["clicked"] : ""}`}
        onClick={toggleAnswer}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {opened ? (
          <Image
            src="/minus.svg"
            width={12}
            height={12}
            alt="Minus Sign"
            className={styles["minus-sign"]}
          />
        ) : (
          <Image
            src="/Group 36811.svg"
            width={12}
            height={12}
            alt="Plus Sign"
            className={styles["plus-sign"]}
          />
        )}
      </div>
      <div className={styles["question"]} onClick={toggleAnswer}>
        {question}
      </div>
      {opened && <div className={styles["answer"]}>{answer}</div>}
    </div>
  );
};

export default FaqSection;
