import { Row, Col, Container } from 'react-bootstrap'
import styles from './export.module.css'
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import DynamicImage from '../dynamicImage';

const strings = {
    phone: {
        en: 'Phone:',
        ta: 'தொலைபேசி:'
    },
    more: {
        en: 'Load More',
        ta: 'மேலும் ஏற்றுக'
    }
}

const Promoter = ({ data }) => {
    const { locale } = useRouter();
    return (<div className={styles.whitebox}>
        <div className={styles.logocontainer}>
            <DynamicImage src={data.logo} objectFit="contain" objectPosition='center' />
        </div>
        <div className='mt-3 mb-2'>
            <h5 className={styles.thin}>
                {data.name}
            </h5>
            <div className='smaller mt-1'>
                {data.description}
            </div>
        </div>
        <div className='d-flex mt-auto'>
            <div className="my-auto">
                <Image alt="" src="/promo_phone.svg" height={16} width={16} />
            </div>
            <div className="my-auto ms-2">
                <div className={styles.smalltext}>
                    {data.phone}
                </div>
            </div>
        </div>
        <div className='d-flex mt-0'>
            <div className="my-auto">
                <Image alt="" src="/promo_email.svg" height={16} width={16} />
            </div>
            <div className="my-auto ms-2">
                <div className={styles.smalltext}>
                    {data.email}
                </div>
            </div>
        </div>
        
    </div>)
}


export default function CouncilBlock({ data, header }) {
    const maxItems = 12;
    const [loaded, setLoaded] = useState(maxItems);

    const loadMore = () => {
        setLoaded(loaded + maxItems);
    }

    const { locale } = useRouter();


    const hasMore = data.length > loaded;
    const sortedData = data.sort((a, b) => {
        return a.order_id - b.order_id;
    })

    const loadedData = sortedData.slice(0, loaded);


    return (
        <Container className="my-5">
            <div className="d-flex">
                <div className="my-auto">
                    <h3>
                        {header.heading}
                    </h3>
                </div>
                <div className="ms-auto my-auto">
                    {/* FILTER */}
                </div>
            </div>
            <div className='mt-2'>
                {header.description}
            </div>
            <Row className='mt-4 mb-2'>
                {loadedData.map((each, index) => {
                    return (<Col md={6} lg={4} xl={3} key={index}>
                        <Promoter data={each} />
                    </Col>)
                })}
            </Row>

            <center>
                {hasMore && <div onClick={loadMore} className={styles.morebutton}>
                    {strings.more[locale]}
                </div>}
            </center>

        </Container>
    )
}

