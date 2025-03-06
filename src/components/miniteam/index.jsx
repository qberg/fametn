import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import Bluepill from "../bluepill"
import YellowArrowButton from "../yellow_arrow_button"
import { TeamsCard } from "../teamsgrid"

export default function MiniTeam({heading, teams}) {
    return (<Container className="my-5 pb-4">
    <Bluepill text={heading.subtitle} />
    <h2 data-aos="fade-up" className="pt-3">
        {heading.title}
    </h2>
    <div className="d-block d-lg-flex">
        <div data-aos="fade-up" className="my-auto me-3">
            <div className="small">
                {heading.description}
            </div>
        </div>
        <div data-aos="fade-up" data-aos-delay={150} className="my-lg-auto mt-4 mt-lg-auto  ms-auto">
            <YellowArrowButton text={heading.cta_text} link={heading.cta_link} />
        </div>
    </div>
    <hr></hr>
    <Row className="mt-5">
        {teams.data.map((team, index) => {
            return (<Col lg={4} md={6} key={index}>
                <TeamsCard data={team.attributes} />
            </Col>)
        })}
    </Row>
    </Container>)
}