import { Container, Row, Col } from "react-bootstrap";
import EvHeading from "../heading";
import styles from "./styles.module.css"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DynamicImage from "../../dynamicImage";
import { SelectedIndicator, UnselectedIndicator } from '../../gallery';
import Image from "next/image";

function PrevArrow({ onClickHandler, hasPrev }) {
    return (
        <div className={styles.arrwrap}>
            <div data-shono={hasPrev} className={styles.cararrow} onClick={onClickHandler} >
                <Image alt="arrow" height={24} width={24} src="/car_arrow_left.svg" />
            </div>
        </div>
    )
}

function NextArrow({ onClickHandler, hasNext }) {
    return (
        <div className={styles.arrwrapright}>
            <div data-shono={hasNext} className={styles.cararrow} onClick={onClickHandler} >
                <Image className={styles.rightside} alt="arrow" height={24} width={24} src="/car_arrow_left.svg" />
            </div>
        </div>
    )
}


function ItemRender({ item }) {
    return (<div className="mb-4 px-lg-5">
        <Row>
            <Col md={6} lg={3}>
                <div className={styles.img}>
                    <DynamicImage src={item.image} objectFit="contain" />
                </div>
            </Col>
            <Col md={6} lg={9} >
                <div className="h-100 d-flex">
                    <div className={`my-auto ${styles.text}`}>
                        {item.description}
                    </div>

                </div>

            </Col>
        </Row>
    </div>)
}

export default function EvSection2({ heading, items }) {
    return (<Container className="my-5 py-4">
        <EvHeading text={heading} />
        <div className="my-4">
            <div  data-aos="fade-up" className={styles.holder}>
                <Carousel
                    showIndicators={true}
                    showStatus={false}
                    showThumbs={false}
                    emulateTouch={true}
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        (<PrevArrow onClickHandler={onClickHandler} hasPrev={hasPrev} />)}
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        (<NextArrow onClickHandler={onClickHandler} hasNext={hasNext} />)}

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
                    {items.map((each, index) => {
                        return (<ItemRender item={each} key={index} />)
                    })}
                </Carousel>
            </div>
        </div>

    </Container>)
}