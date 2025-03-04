import { Container, Row, Col, Tab } from "react-bootstrap"
import styles from "./styles.module.css"
import EvHeading from "../heading"
import DynamicImage from "../../dynamicImage"
import Image from "next/image"

export default function EvAboutMembers({ heading, items }) {
    const allCategories = [...new Set(items.flatMap(item => item.categories.map(category => category.text)))].sort()


    const TableRow = ({ item }) => {
        return (<tr>
            <td>
                <div className={styles.img}>
                    <DynamicImage src={item.icon} objectFit="contain" />
                </div>
                <div className="mt-2 small">
                    {item.description}
                </div>
            </td>
            {
                allCategories.map((category, index) => {
                    const isCategoryPresent = item.categories.some(each => each.text === category)
                    const imagePath = isCategoryPresent ? "/evsell.svg" : "/evnosell.svg"

                    return (<td key={index}>
                        <Image src={imagePath} height={48} width={48} />
                    </td>)
                })
            }
        </tr>)
    }

    return (<Container className="my-5 py-4">
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

        <div className="mt-4">
            <table data-aos="fade-up" className={styles.table}>
                <thead>
                    <tr>
                        <th>

                        </th>
                        {allCategories.map((category, index) => {
                            return (<th key={index}>
                                {category}
                            </th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {items.map((each, index) => {
                        return (<TableRow item={each} key={index} />)
                    })}
                </tbody>
            </table>
        </div>
    </Container>)
}