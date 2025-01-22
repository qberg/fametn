import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import YellowArrowButton from "../yellow_arrow_button"
import { useRouter } from "next/router"
import ResourcesImageCard from "../resourceimagecard"

const strings = {
    viewall : {
        en : 'View All',
        ta : 'மேலும் ஏற்றுக'
    }
}

export default function YellowResourcesBlock({ data }) {
    const {locale} = useRouter()

    const threeResources = data.resources.data.slice(0,3).map(each => each.attributes)

    return (<Container className={`py-5 ${styles.yellowbg}`} fluid>
        <Container className="py-4">
            <Bluepill text={data.supertitle} />

            <h3 className="mt-3">
                {data.title}
            </h3>
            <div className="d-flex mt-1 mb-1">
                <div>
                {data.description} 
                </div>
                <div className="ms-auto">
                    <YellowArrowButton text={strings.viewall[locale]} link="/resources" />
                </div>
            </div>
           <hr></hr>
           <Row>
            {threeResources.map((each, index) => {
                return (<Col key={index} lg={4} md={6}>
                    <ResourcesImageCard data={each} />
                </Col>)
            })}
           </Row>
        </Container>
    </Container>)
}