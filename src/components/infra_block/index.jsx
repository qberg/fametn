import { Container, Row, Col } from 'react-bootstrap';
import styles from './infrablock.module.css';
import { useRouter } from 'next/router';
import { useState } from 'react';
import DynamicImage from '../dynamicImage';
import Image from 'next/image';
import Link from 'next/link';

export default function InfraBlock({ data, title, description }) {
    const [selected, setSelected] = useState(0);
    const headings = data.map(each => each.title)

    const chosenOne = data[selected];
    const allImages = chosenOne.images.data.map(each => { return { data: each } });
    return (<Container className='my-5'>
        <h3>
            {title}
        </h3>
        <p>
            {description}
        </p>
        <div className='d-flex flex-wrap small'>
            {headings.map((each, index) => {
                return <div onClick={() => setSelected(index)} className={`${styles.heading} ${selected === index ? styles.selected : ''}`}>
                    {each}
                </div>
            })}
        </div>
        <Row className='my-2'>
            <Col className="d-none d-lg-flex" lg={3}>
                <div className="d-flex w-100 flex-column h-100">
                    <div className={`${styles.block} flex-grow-1`}>
                        <DynamicImage src={allImages[1]} objectFit="cover" />
                    </div>
                    <div className={`${styles.block} flex-grow-1 my-2`}>
                        <DynamicImage src={allImages[2]} objectFit="cover" />
                    </div>
                    <div className={`${styles.block} flex-grow-1`}>
                        <DynamicImage src={allImages[3]} objectFit="cover" />
                    </div>
                </div>
            </Col>
            <Col className="d-none d-lg-flex" lg={5}>
                <div className={styles.mapcover}>
                    <DynamicImage src={chosenOne.map} objectFit="contain" />
                </div>
            </Col>
            <Col lg={4}>
                <h5>
                    {chosenOne.title}
                </h5>
                <div className={`my-3 ${styles.mainImage}`}>
                    <DynamicImage src={allImages[0]} objectFit="cover" />
                </div>
                <div className='small'>
                    {chosenOne.description}
                </div>
                <div className='small my-3'>
                    <div className='d-flex my-1'>
                        <div className='position-relative'>
                            <Image src="/infra_phone.svg" height={16} width={16} />
                        </div>
                        <div className='ms-2'>
                            {chosenOne.phone}
                        </div>
                    </div>

                    <div className='d-flex my-1'>
                        <div className='position-relative'>
                            <Image src="/infra_location.svg" height={16} width={16} />
                        </div>
                        <div className='ms-2'>
                            {chosenOne.location}
                        </div>
                    </div>
                </div>
                <div className='small'>
                    <Link href={chosenOne.cta_link || "#"} target='_blank'>
                        <div className={styles.cta}>
                            {chosenOne.cta_name}
                        </div>
                    </Link>
                </div>
            </Col>
        </Row>
    </Container>)
}