import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import EvHeading from "../heading"
import EvButton from "../button"
import DynamicImage from "../../dynamicImage"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { SelectedIndicator, UnselectedIndicator } from "../../gallery"

function NewsItem({ item }) {
    return (<div data-aos="fade-up" className={styles.card}>
        <div className={styles.img}>
            <DynamicImage src={item.image} objectFit="cover" />
        </div>
        <div className="p-3">
            <div className="d-flex">
                <div className={styles.cat}>
                    {item.heading}
                </div>
                <div className="ms-2">
                    {item.subtitle}
                </div>
            </div>
            <div className="mt-2 small">
                <div className={styles.txt}>
                    {item.description}
                </div>
            </div>
        </div>
    </div>)
}

export default function EvNews({ data }) {
    const { heading, main_news, subheading, items } = data
    return (<Container className={`py-5 ${styles.bg}`} fluid>
        <Container className="py-4">
            <EvHeading text={heading.subtitle} />
            <Row className="mt-4">
                <Col lg={6}>
                    <h2 data-aos="fade-up">
                        {heading.title}
                    </h2>
                </Col>
                <Col lg={6}>
                    <p data-aos="fade-up" className="small mt-lg-2">
                        {heading.description}
                    </p>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col lg={6}>
                    <div data-aos="fade-up" className={styles.mainimg}>
                        <DynamicImage src={main_news.image} objectFit="cover" />
                    </div>
                </Col>
                <Col lg={6}>
                    <h3 data-aos="fade-up">
                        {main_news.heading}
                    </h3>
                    <div data-aos="fade-up" className="mt-2 small">
                        {main_news.description}
                    </div>
                    <div data-aos="fade-up" className="mt-4">
                        <EvButton link={main_news.link} text={main_news.link_text} />
                    </div>
                </Col>
            </Row>
            <div data-aos="fade-up" className={styles.pullup}>
                <div className="px-0 px-lg-5">
                    <div className={styles.sub}>
                        <div className=" d-block d-lg-flex">
                            <div className="my-auto me-auto">
                                <h4 data-aos="fade-up">
                                    {subheading.title}
                                </h4>
                                <div data-aos="fade-up" className="mt-2 small">
                                    {subheading.description}
                                </div>
                            </div>
                            <div data-aos="fade-up" className="ms-lg-2 mt-2 mt-lg-auto  flex-shrink-0">
                                <EvButton link={subheading.link} text={subheading.link_text || "View All"} />
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="d-none d-xl-block">
                                <Carousel
                                    centerMode={true}
                                    showIndicators={true}
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
                                    showStatus={false}
                                    showThumbs={false}
                                    showArrows={false}
                                    centerSlidePercentage={40}>
                                    {items.map((item, index) => {
                                        return (<div key={index} className="p-3 mb-5">
                                            <NewsItem item={item} key={index} />
                                        </div>)
                                    })}
                                </Carousel>
                            </div>

                            <div className="d-none d-lg-block d-xl-none">
                                <Carousel
                                    centerMode={true}
                                    showIndicators={true}
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
                                    showStatus={false}
                                    showThumbs={false}
                                    showArrows={false}
                                    centerSlidePercentage={70}>
                                    {items.map((item, index) => {
                                        return (<div key={index} className="p-3 mb-5">
                                            <NewsItem item={item} key={index} />
                                        </div>)
                                    })}
                                </Carousel>
                            </div>

                            <div className="d-block d-lg-none">
                                {items.map((item, index) => {
                                    return (<div key={index} className="mb-4">
                                        <NewsItem item={item} key={index} />
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </Container>)
}