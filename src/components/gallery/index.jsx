import { Container } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import YellowArrowButton from "../yellow_arrow_button"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DynamicImage from "../dynamicImage";

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
                <div data-aos="fade-up" className="d-flex">
                    <div className="m3-auto">
                        {data.description}
                    </div>
                    <div className="ms-2">
                        <YellowArrowButton text={data.cta_text} link={data.cta_link} />
                    </div>
                </div>
                <div data-aos="fade-up" className="d-none d-lg-block my-5">
                    <Carousel
                        centerMode={true}
                        centerSlidePercentage={33.334}
                        // showArrows={false} 
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
                <div className="d-block d-lg-none my-5">
                <Carousel
                        // showArrows={false} 
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