// breadcrumps component in next js
// this component accepts a list of {text, url} objects and renders a breadcrump

import React from "react";
import styles from "./breadcrumps.module.css";
import Link from "next/link";
import { Container } from "react-bootstrap";

const RightArrow = () => {
  return <div className={styles.arrow}> &gt;</div>;
};

const Breadcrumps = ({ items }) => {
  return (
    <>
      {items && (
        <Container className="pt-4">
          <div className={styles.breadcrumpsContainer}>
            {items.map((item, index) => {
              return (
                <div
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  key={index}
                  className={styles.breadcrump}
                >
                  {/* add right arrow if not first item */}
                  {index !== 0 && <RightArrow />}

                  {/* add hyperlinked item */}
                  <Link href={item?.url || "/"}>{item.text}</Link>
                </div>
              );
            })}
          </div>
        </Container>
      )}
    </>
  );
};

export default Breadcrumps;
