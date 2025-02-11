import { Container, Row, Col } from "react-bootstrap";
import styles from "./emarketsimagegallery.module.css";
import DynamicImage from "../dynamicImage";
import { useState } from "react";
import YellowArrowButton from "../yellow_arrow_button";
import { useRouter } from "next/router";

const strings = {
    "back": {
        "en": "Back",
        "ta": "பின்னால்"
    }
}

export default function EmarketsImageGallery({ title, description, images }) {
    const allImages = images.data;
    const displayImagesCount = 6;

    const { locale } = useRouter();

    const displayedImages = allImages.slice(0, displayImagesCount);

    const remainingImageCount = allImages.length - displayImagesCount;

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(0);

    // concat all images 10 times
    const allImagesForGrid = Array.from({ length: 1 }, () => allImages).flat();

    const desktopGallery = (<div className={styles.gallerydesktop}>
        <Container fluid className="h-100">
            <Row className="h-100">
                <Col className="h-100" md={4}>
                    <div className={styles.dgwrap}>
                        <div className={styles.gallerydesktopgrid}>
                            {allImagesForGrid.map((each, index) => {
                                const isSelected = selected === index;
                                return (
                                    <div key={index} onClick={() => setSelected(index)} data-selected={isSelected} className={styles.desktopgrid}>
                                        <DynamicImage src={{ data: each }} objectFit="cover" />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </Col>
                <Col className="g-0" md={8}>
                    <div className="d-flex h-100 w-100 flex-column position-relative">
                        <div className={styles.dskcontrols}>
                            <div onClick={() => setOpen(false)} className="ms-auto me-4">
                                <YellowArrowButton text={strings.back[locale]} />
                            </div>
                        </div>
                        <div className={styles.dskimg}>
                            <DynamicImage src={{ data: allImagesForGrid[selected] }} objectFit="cover" objectPosition="center" />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>)

    const mobileGallery = (<div className={styles.gallerymobile}>
        <div onClick={() => setOpen(false)} className="ms-auto me-3">
            <YellowArrowButton text={strings.back[locale]}  />
        </div>
        <div className={styles.mobimg}>
            <DynamicImage src={{ data: allImagesForGrid[selected] }} objectFit="cover" objectPosition="center" />
        </div>
        <div className={styles.mobilecontrols}>
            {allImagesForGrid.map((each, index) => {
                const isSelected = selected === index;
                return (
                    <div key={index} onClick={() => setSelected(index)} data-selected={isSelected} className={styles.mobthumb}>
                        <DynamicImage src={{ data: each }} objectFit="cover" />
                    </div>
                )
            })}
        </div>
    </div>)

    return (
        <Container className="my-5">
            <h2 data-aos="fade-up" className="pt-4">
                {title}
            </h2>
            <p data-aos="fade-up" className="mt-3">
                {description}
            </p>
            <Row className="my-4 pb-5">
                {displayedImages.map((each, index) => {

                    const isLast = (index === displayedImages.length - 1) && remainingImageCount > 0;
                    return (
                        <Col
                            onClick={() => {
                                setSelected(index)
                                setOpen(true)
                            }} key={index} md={4} className={`mt-4 g-3 g-md-0 ${styles.nomy} ${styles.imgbox}`}>
                            <div data-aos="fade-up" data-aos-delay={(index % 3) * 100} className={styles.imageContainer}>
                                <DynamicImage src={{ data: each }} objectFit="cover" />
                                {isLast && (<div className={styles.more}>
                                    <div className="m-auto">
                                        +{remainingImageCount}
                                    </div>
                                </div>)}
                            </div>
                        </Col>
                    )
                })}
            </Row>
            {open && (
                <div>
                    <div className="d-none d-md-block">
                        {desktopGallery}
                    </div>
                    <div className="d-block d-md-none">
                        {mobileGallery}
                    </div>
                </div>)}
        </Container>
    )
}