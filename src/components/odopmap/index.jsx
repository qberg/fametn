import { Col, Container, Row } from 'react-bootstrap';
import styles from './styles.module.css';
import Bluepill from '../bluepill';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BlueArrowButton from '../blue_arrow_button';
import DynamicImage from '../dynamicImage';
import { SelectedIndicator, UnselectedIndicator } from '../gallery';



function RenderMap({ item }) {
    return (<div>
        <Row className='gx-5'>
            <Col lg={6}>
                <div data-aos="fade-up" className={styles.map}>
                    <DynamicImage
                        src={item.image}
                        objectFit='contain'
                    />
                </div>
            </Col>
            <Col className='d-flex' lg={6}>
                <div data-aos="fade-up" className={styles.card}>
                    <h3 data-aos="fade-up" className={styles.heading}>
                        {item.heading}
                    </h3>
                    <h5 data-aos="fade-up" className={styles.subheading}>
                        {item.subtitle}
                    </h5>
                    <p data-aos="fade-up" className='small'>
                        {item.description}
                    </p>

                    <BlueArrowButton text={item.link_text} link={item.link} />
                </div>
            </Col>
        </Row>
    </div>)
}

export default function OdopMap({ items, heading }) {
    return (<Container className='mt-5 py-4'>
        <Bluepill text={heading.title} />
        <hr></hr>
        <Row>
            <Col lg={6}>
                <h2 data-aos="fade-up">
                    {heading.subtitle}
                </h2>
            </Col>
            <Col lg={6}>
                <p data-aos="fade-up" className='small'>
                    {heading.description}
                </p>
            </Col>
        </Row>
        <Carousel
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={5000}
            renderIndicator={(onClickHandler, isSelected, index, label) => {
                if (isSelected) {
                    return (
                        <SelectedIndicator onClickHandler={onClickHandler} isSelected={isSelected} />
                    );
                }
                return (
                    <UnselectedIndicator onClickHandler={onClickHandler} isSelected={isSelected} />

                );
            }}
        >
            {items.map((item, index) => {
                return (<RenderMap key={index} item={item} />)
            })}
        </Carousel>
    </Container>)
}