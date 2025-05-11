"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { useEffect, useRef, useState } from "react";

const SchemeStickyButton = ({ text, handleClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const buttonWrapperRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const footerElement = document.querySelector("footer");
    if (!footerElement) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      },
    );

    observerRef.current.observe(footerElement);

    return () => {
      if (observerRef.current && footerElement) {
        observerRef.current.unobserve(footerElement);
      }
    };
  }, []);

  return (
    <div
      ref={buttonWrapperRef}
      className={`${styles.buttonWrapper} ${isVisible ? styles.visible : styles.hidden}`}
    >
      <div className="bluebutton" onClick={handleClick}>
        <div className="ms-auto me-2 my-auto">
          <Image src="/apply_arrow.svg" alt="->" width={16} height={16} />
        </div>
        <div className="me-auto small my-auto">{text}</div>
      </div>
    </div>
  );
};

export default SchemeStickyButton;
