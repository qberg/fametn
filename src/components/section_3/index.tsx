// components/Section3.js
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DynamicImage from '@/components/dynamicImage';
import Image from 'next/image';
import styles from './section_3.module.css';
import { CacheHeaders, JSONData } from "@/utils/definitions";


  const Section3 = ({ firstSection3Item, nextTwoSection3Items }: JSONData) => {
    return (
      <div className={styles.divs}>
        <Row>
          <Col lg={7}>
            <div className={styles.div1}>
              {firstSection3Item && (
                <div>
                  <div className={styles.imageItems}>
                    <DynamicImage objectFit="contain" src={firstSection3Item.image} />
                  </div>
                  <div className={styles.headings}>
                    <h5>{firstSection3Item.heading}</h5>
                    <small >{firstSection3Item.description}</small>
                    <p className="mt-5">{firstSection3Item.name}</p>
                    <small>{firstSection3Item.designation}</small>
                  </div>
                  <div className={styles.link}>
                    <a
                      href={firstSection3Item.cta_link}
                      className={styles.whiteTextLink}
                    >
                      {firstSection3Item.cta_title}
                    </a>
                    <Image
                      src="/right-arrow.svg"
                      alt="->"
                      width={15}
                      height={15}
                    />
                  </div>
                </div>
              )}
            </div>
          </Col>
          <Col lg={5}>
            <Row>
              <Col>
                {nextTwoSection3Items[0] && (
                  <div className={styles.div2}>
                    <div className={styles.imageItems1}>
                      <DynamicImage objectFit="contain" src={nextTwoSection3Items[0].image} />
                    </div>
                    <div className={styles.headings2}>
                      <h5>{nextTwoSection3Items[0].heading}</h5>
                    </div>
                    <div className="mt-5">
                      <a href={nextTwoSection3Items[0].cta_link} className={styles.blackTextLink}>
                        {nextTwoSection3Items[0].cta_title}
                      </a>
                      <Image
                        src="/right_arrow.svg"
                        alt="->"
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col>
                {nextTwoSection3Items[1] && (
                  <div className={styles.div3}>
                    <div className={styles.imageItems2}>
                      <DynamicImage objectFit="contain" src={nextTwoSection3Items[1].image} />
                    </div>
                    <div className={styles.headings1}>
                      <h5>{nextTwoSection3Items[1].heading}</h5>
                    </div>
                    <div className="mt-5">
                      <a href={nextTwoSection3Items[1].cta_link} className={styles.whiteTextLink}>
                        {nextTwoSection3Items[1].cta_title}
                      </a>
                      <Image
                        src="/right-arrow.svg"
                        alt="->"
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

export default Section3;
