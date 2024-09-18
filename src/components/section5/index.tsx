import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './section5.module.css'; 
import Image from 'next/image';
import { CacheHeaders, JSONData } from "@/utils/definitions";




  const Section5 = ({ title, items }: JSONData) => {
return(
  <Container className={styles.blackbox} >
    <div className={styles.containerFluid}>
    {title && (
            <h2 className='mt-5 mb-5'>{title}</h2>
   
    )}
    <Row>
      {items.map(item => (
        <Col lg={4} key={item.id}>
     
          <div className={styles.cardContent}>
          <div className={styles.categoryWrapper}>
                <small className={styles.category}>{item.category}</small>
              </div>
              <p className={styles.title}>{item.title}</p>
            </div>
            <p className={styles.description}>{item.description}</p>
          <p className={styles.date}>{item.date}</p>
          <div className='mt-3 d-flex'>
            <a href={item.link} className={styles.link}>{item.link_title}</a>
            <div className='ms-2 my-auto'>
            <Image
                    src="/right_arrow.svg"
                    alt="->"
                    width={15}
                    height={15}
              />
              </div>
          </div>
        </Col>
      ))}
      </Row>
      </div>
  </Container>
);
};

export default Section5;