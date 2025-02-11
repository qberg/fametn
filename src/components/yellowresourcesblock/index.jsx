import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import YellowArrowButton from "../yellow_arrow_button"
import { useRouter } from "next/router"
import ResourcesImageCard from "../resourceimagecard"

const strings = {
    viewall: {
        en: 'View All',
        ta: 'மேலும் ஏற்றுக'
    }
}

export default function YellowResourcesBlock({ data }) {
    const { locale } = useRouter()

    const threeResources = data.resources.data.slice(0, 3).map(each => each.attributes)

    return (<Container className={`py-5 ${styles.yellowbg}`} fluid>
        <Container className="py-4">
            <Bluepill text={data.supertitle} />

            <h2 data-aos="fade-up" className="mt-3">
                {data.title}
            </h2>
            <div data-aos="fade-up" className="d-block d-md-flex mt-1 mb-1">
                <div className="me-auto">
                    {data.description}
                </div>
                <div className="mt-3 mt-md-0 ms-md-4">
                    <YellowArrowButton text={strings.viewall[locale]} link="/resources" />
                </div>
            </div>
            <hr data-aos="fade-up" className="my-4"></hr>
            <Row className="mt-5">
                {threeResources.map((each, index) => {
                    return (<Col data-aos="fade-up" data-aos-delay={100 * index} key={index} lg={4} md={6}>
                        <ResourcesImageCard data={each} />
                    </Col>)
                })}
            </Row>
        </Container>
    </Container>)
}