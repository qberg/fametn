import React, { forwardRef, useImperativeHandle, useState } from 'react';
import styles from "./eventpopup.module.css";
import { Col, Row } from 'react-bootstrap';
import Image from 'next/image';
import DynamicImage from '../dynamicImage';
import YellowArrowButton from '../yellow_arrow_button';
import { useRouter } from 'next/router';

const formatDate = (date) => {
    // convert date from "2024-12-24" to dd MMM YYYY
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString("en-US", { day: 'numeric', month: 'short', year: 'numeric' });
}

const strings = {
    "register": {
        "en": "Register Now",
        "ta": "உள்நுழைக"
    }
}

const EventPopup = forwardRef((props, ref) => {

    const { locale } = useRouter();

    const [show, setShow] = useState(false);
    const [data, setData] = useState({});

    const showItem = (data) => {
        setShow(true);
        setData(data);
    };

    const hideItem = () => {
        setShow(false);
    }

    useImperativeHandle(ref, () => ({
        showItem
    }));

    const dateString = formatDate(data.start_date) + (data.end_date ? " - " + formatDate(data.end_date) : "");

    return show && (
        <div className={styles.background} onClick={() => hideItem()}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <div className="d-block d-md-flex w-100">
                    <div className="w-100">
                        <Row>
                            <Col className={styles.nomb} md={4}>
                                <div className={styles.eventcardimg}>
                                    <DynamicImage src={data.image} objectFit='cover' />
                                </div>
                            </Col>
                            <Col className={`mt-3 mt-md-0 ${styles.nomb}`} md={8}>
                                <p className={styles.eventcardtitle}>
                                    {data.title}
                                </p>
                                <div className='small mb-3'>
                                    <div className='d-flex'>
                                        <div className='my-auto'>
                                            <Image src="/event_cal.svg" height={14} width={14} />
                                        </div>
                                        <div className="my-auto ms-2">
                                            {dateString}
                                        </div>
                                    </div>
                                    <div className='d-flex my-1'>
                                        <div className='my-auto'>
                                            <Image src="/event_loc.svg" height={14} width={14} />
                                        </div>
                                        <div className="my-auto ms-2">
                                            {data.location}
                                        </div>
                                    </div>
                                </div>
                                <YellowArrowButton target="_blank" text={strings.register[locale]} link={data.registration_link} />
                            </Col>
                        </Row>
                    </div>
                    <div className='d-none d-md-block ms-none ms-md-auto'>
                        <div onClick={() => hideItem()} className={styles.closebutton}>
                            <Image alt='x-button' src="/close_button.svg" height={12} width={12} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

EventPopup.displayName = 'EventPopup';

export default EventPopup;