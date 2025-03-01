import { Container, Row, Col } from "react-bootstrap"
import styles from "./styles.module.css"
import { useState } from "react"
import DynamicImage from "../dynamicImage";

function groupByFive(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i += 5) {
        result.push(arr.slice(i, i + 5));
    }
    return result;
}

function RenderHugeImage({ image }) {
    console.log(image)
    return (<Col className={styles.ourcol} lg={6}>
        <div data-aos="fade-up" className={styles.hugeimg}>
            <DynamicImage src={{ data: image }} objectFit="cover" />
        </div>
    </Col>)
}

function RenderSmallImages({ images }) {
    return (<Col className={styles.ourcol} lg={6}>
        <Row >
            {images.map((image, index) => <Col key={index} lg={6}>
                <div data-aos="fade-up" className={styles.smallimg}>
                    <DynamicImage src={{ data: image }} objectFit="cover" />

                </div>
            </Col>)}
        </Row>
    </Col>)
}


function RenderRow({ row, leftHuge = true }) {
    const hugeImage = leftHuge ? row[0] : row[4]
    const smallImages = leftHuge ? row.slice(1, 5) : row.slice(0, 4)

    const hugeImgRender = <RenderHugeImage image={hugeImage} />
    const smallImgRender = <RenderSmallImages images={smallImages} />
    const rightOrderRender = leftHuge ? [hugeImgRender, smallImgRender] : [smallImgRender, hugeImgRender]
    return (<Row >
        {rightOrderRender}
    </Row>)
}

export default function GalleryGrid({ items }) {

    const allCategories = items.map((item) => item.title).sort()

    const [currentCategory, setCurrentCategory] = useState(allCategories[0])

    const currentItems = items.filter((item) => item.title === currentCategory)[0].images.data
    // const [currentItems, setCurrentItems] = useState(items.filter((item) => item.title === currentCategory)[0].items)

    const rows = groupByFive(currentItems)
    console.log("rows are", rows)

    return (<Container className="my-5 ">
        <div className="d-flex flex-wrap">
            {allCategories.map((category, index) => <div data-aos="fade-up" data-aos-delay={index * 100}  key={index} className={`p-2 px-4 ${currentCategory === category ? styles.activecategory : styles.category}`} onClick={() => {
                setCurrentCategory(category)
            }}>
                {category}
            </div>)}
        </div>

        <h3 data-aos="fade-up" className="my-4">
            {currentCategory}
        </h3>

        {rows.map((row, index) => <RenderRow key={index} row={row} leftHuge={index % 2 === 0} />)}
    </Container>)
}