import Image from "next/image";
import YellowArrowButton from "@/components/yellow_arrow_button";
import styles from "./templatecomponent2.module.css"
import FaqSection from "@/components/faq";
import RootLayout from "../../components/layout/layout";
import { Col, Container, Row } from "react-bootstrap";
import DynamicImage from "@/components/dynamicImage";
import Section3 from "@/components/section_3";
import Section5 from "@/components/section5";
import { CacheHeaders, JSONData } from "@/utils/definitions";

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

import React, { useState } from 'react';

export default function TemplateComponent2({ data }: JSONData) {
  const [activeItemId, setActiveItemId] = useState(null);

  const handleHeadingClick = (id : any) => {
    setActiveItemId(activeItemId === id ? null : id);
  };

  const [selectedId, setSelectedId] = useState(data.section_1[0]?.id);

  const selectedItem = data.section_1.find((item: { id: any; }) => item.id === selectedId);
  const firstSection3Item = data.section_3[0];

  const nextTwoSection3Items = data.section_3.slice(1, 3);
  return (
    <RootLayout>
    <Container>
      <div className={styles.imagesWrapper}>
        <Image src="/Ellipse 22.svg" alt="Image Description" width={400} height={400} />
      </div>

      <Row className={styles.hero}>
        <Col lg={7} xl={6}>
          <div className={styles.container}>
            <div data-aos="fade-up" className={styles.supertitle}>
              <h1>{data.hero.heading}</h1>
            </div>
            <div data-aos="fade-up" className={styles.title}>
              <h1>{data.hero.description}</h1>
            </div>
            <div data-aos="fade-up" className={styles.subtitle}>
              <p>{data.hero.title}</p>
            </div>
          </div>

          <div className="mt-4">
            <YellowArrowButton text={data.hero.cat_name} link={data.hero.cta_link} />
          </div>
        </Col>
        <Col lg={5} xl={6}></Col>
      </Row>

      <div className="d-flex flex-column">
        <center>
          <div className={styles.centereddiv}>
            <h2 className={styles.marginBottom}>{data.partner_title}</h2>
            </div>
          
        </center>
      </div>
      <div className={styles.imageRow}>
        {data.partner_section.map((item: JSONData) => (
          <div key={item.id} className={styles.imageContainer}>
              <DynamicImage objectFit="contain" src={item.image} />
          </div>
        ))}
      </div>
      </Container>
      <Container>
      <Row className="mb-5">
        {data.section_1.map((item: JSONData) => (
          <Col lg={4} key={item.id}>
            <div
              className={`${styles.content} ${activeItemId === item.id ? styles.active : ''}`}
              onClick={() => handleHeadingClick(item.id)}
            >
              <h2 className={styles.heading}>
                {item.heading}
              </h2>
              {activeItemId === item.id && (
                <>
                  <p className={styles.description}>{item.description}</p>
                  <a href={item.link} className={styles.subtitle}>
                    {item.subtitle}
                  </a>
                </>
              )}
            </div>
          </Col>
        ))}
      </Row>
      
    
      <Section3
          firstSection3Item={firstSection3Item}
          nextTwoSection3Items={nextTwoSection3Items}
        />
               <div className="d-flex flex-column">
        <center>
          <div className={styles.centereddiv}>
              <h4 >{data.section4_title1}</h4>
              <h2 >{data.section4_title2}</h2>    
            </div>
          
        </center>
      </div>
      <Row  className={styles.rowContainer}>
        {data.section_4.map((item: JSONData) => (
          <Col lg={4} key={item.id}>
            <div className={styles.box}>
           <div className={styles.imageAndDetails}>

            <div className={styles.imageContainers}>
              <DynamicImage objectFit="contain" src={item.image} />
                
              </div>
              <div className={styles.details}>
                <div className={styles.names}><p>{item.name}</p></div>
                <div className={styles.designations}>{item.designation}</div>
              </div>
              </div>

              <div className={styles.descriptions}>
                {item.description}
              </div>
            </div>
          </Col>
        ))}
      </Row>
            {/* <Container>
      <Row className={styles.rowContainer}>
        {data.section_4.map((item) => (
          <Col lg={4} md={6} sm={12} key={item.id} className="mb-4">
            <div className={styles.box}>
              <div className={styles.imageAndDetails}>
                <div className={styles.imageContainers}>
                  <DynamicImage
                    objectFit="contain"
                    src={item.image}
                    // Pass any additional props needed here
                  />
                </div>
                <div className={styles.detailsContainers}>
                  <div className={styles.names}>{item.name}</div>
                  <div className={styles.designations}>{item.designation}</div>
                </div>
              </div>
              <div className={styles.description}>
                {item.description}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container> */}
      </Container>
      <Section5
          title={data.section5_title} 
        items={data.section_5} />
      <Container>
        <Row className="mt-5">
        <Col lg={6}>
        <div className="mt-5 position-relative">
				<h5>{data.QA}</h5>
				<h4 className="mt-2 mb-5">
					{data.QA_title1}
				</h4>
					
			</div>
        </Col>
        <Col className="mt-5" lg={6}>
            {data.qa_section.map((each: { question: any; answer: any; }, key: React.Key | null | undefined) => (
                <FaqSection key={key} question={each.question} answer={each.answer} />
            ))}
        </Col>
        </Row>
        </Container>
      
    </RootLayout>
    
  );
};

