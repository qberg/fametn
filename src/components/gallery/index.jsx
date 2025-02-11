import { Container } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import YellowArrowButton from "../yellow_arrow_button"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DynamicImage from "../dynamicImage";

function UnselectedIndicator({ onClickHandler, isSelected }) {
    return (<span data-shono="false" className={styles.indic} onClick={onClickHandler}>
    </span>)
}

function SelectedIndicator({ onClickHandler, isSelected }) {
    return (<span data-shono="true" className={styles.indic} onClick={onClickHandler}>
    </span>)
}

export default function Gallery({ data }) {
    const ImageBlock = ({ image }) => {
        return (<div className={styles.imgclass}>
            <div className={styles.imgwrap}>
                <DynamicImage src={{ data: image }} objectFit="cover" />
            </div>
        </div>)
    }
    return (
        <Container className={`${styles.semiyellow} my-5 pt-4`} fluid>
            <Container className="pb-5">
                <Bluepill text={data.supertitle} />
                <h2 data-aos="fade-up" className="mt-3">
                    {data.title}
                </h2>
                <div data-aos="fade-up" className="d-block d-md-flex">
                    <div className="m3-auto">
                        {data.description}
                    </div>
                    <div className="mt-3 mt-md-0 ms-md-4">
                        <YellowArrowButton text={data.cta_text} link={data.cta_link} />
                    </div>
                </div>
                <div data-aos="fade-up" className="d-none d-lg-block my-5">
                    <Carousel
                        centerMode={true}
                        centerSlidePercentage={33.334}
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
                        infiniteLoop={true}
                        autoPlay={true}
                    >
                        {data.images.data.map((each, index) => {
                            return (<ImageBlock key={index} image={each} />)
                        })}
                    </Carousel>
                </div>
                <div className="d-block d-lg-none my-5">
                    <Carousel
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
                        showArrows={false}
                        centerMode={true}
                        centerSlidePercentage={100}
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={true}
                        autoPlay={true}
                    >
                        {data.images.data.map((each, index) => {
                            return (<ImageBlock key={index} image={each} />)
                        })}
                    </Carousel>
                </div>

            </Container>
        </Container>
    )
}