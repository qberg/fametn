import { Row, Col, Container } from 'react-bootstrap'
import styles from './export.module.css'
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
        <div className={styles.yellowbox}>
            <div className='d-flex mb-0'>
                <div className="my-auto">
                    <Image className={styles.promoperson} src="/promo_person.svg" height={22} width={22} />
                </div>
                <div className="my-auto ms-2">
                    <h6 className='mb-0'>
                        {data.name}
                    </h6>
                </div>
            </div>
            <div className={styles.roletext}>
                {data.role}
            </div>
        </div>
        <div className='d-flex mt-auto'>
            <div className="my-auto">
                <Image src="/promo_phone.svg" height={16} width={16} />
            </div>
            <div className="my-auto ms-2">
                <div className={styles.smalltext}>
                    {strings.phone[locale]} {data.phone}
                </div>
            </div>
        </div>
        <div className='d-flex mt-0'>
            <div className="my-auto">
                <Image src="/promo_location.svg" height={16} width={16} />
            </div>
            <div className="my-auto ms-2">
                <div className={styles.smalltext}>
                    {data.location}
                </div>
            </div>
        </div>
        <div className='d-flex mt-0'>
            <div className="my-auto">
                <Image src="/promo_email.svg" height={16} width={16} />
            </div>
            <div className="my-auto ms-2">
                <div className={styles.smalltext}>
                    {data.email}
                </div>
            </div>
        </div>
    </div>)
}


export default function ExportBlock({ data, header }) {
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
                    <h2 data-aos="fade-up">
                        {header.heading}
                    </h2>
                </div>
                <div className="ms-auto my-auto">
                    {/* FILTER */}
                </div>
            </div>
            <div data-aos="fade-up" className='mt-2'>
                {header.description}
            </div>
            <Row className='mt-4 mb-2'>
                {loadedData.map((each, index) => {
                    return (<Col  data-aos="fade-up" md={6} lg={4} xl={3} key={index}>
                        <Promoter data={each} />
                    </Col>)
                })}
            </Row>

            <center>
                {hasMore && <div  data-aos="fade-up" onClick={loadMore} className={styles.morebutton}>
                    {strings.more[locale]}
                </div>}
            </center>

        </Container>
    )
}

