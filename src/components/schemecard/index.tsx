import { JSONData } from "@/utils/definitions";
import styles from "./schemecard.module.css"
import Image from 'next/image'
import { Col, Row } from "react-bootstrap";
import YellowArrowButton from "../yellow_arrow_button";

const SchemeCard = ({ title, icon, link, description, government, implementingAgency }: JSONData) => {

    const customPath = icon?.data?.attributes?.formats?.small?.url
    const iconPath = customPath ? process.env.NEXT_PUBLIC_IMG_ENDPOINT + customPath : "/default_scheme.webp"

    return (
        <div data-aos="fade-up" className={styles.card}>
            <div className="d-flex">
                <div className={styles.img_wrap}>
                    <Image
                        className={styles.innerimg}
                        height={50}
                        width={50}
                        src={iconPath}
                        alt={"card image of " + title}
                    />
                </div>
                <div title={title} className={`ms-2 small ${styles.two_lines}`}>
                    {title}
                </div>
            </div>
            <div className="mt-3">
                <p className={`mb-0 smaller ${styles.description}`}>
                    {description}
                </p>
            </div>

            <div className="horiz_line"></div>

            <Row>
                <Col className="mb-1" md={6}>
                    <div className="d-flex">
                        <div className={styles.red_square}>
                        </div>
                        <div className={`smallest ${styles.red_text} ms-1`}>
                            {government}
                        </div>
                    </div>
                </Col>
                <Col className="mb-1" md={6}>
                    <div className="d-flex">
                        <div className={styles.blue_square}>
                        </div>
                        <div className={`smallest ${styles.blue_text} ms-1`}>
                            {implementingAgency}
                        </div>
                    </div>
                </Col>
            </Row>

            <div className="mt-auto small py-2">
                {/* <center>View Scheme </center> */}
                <center>
                    <div className="pt-1 pb-1">
                        <YellowArrowButton link={link} text={"View Scheme"} />
                    </div>
                </center>
            </div>

        </div>)
}

export default SchemeCard;