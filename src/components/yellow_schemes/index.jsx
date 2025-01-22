import { Col, Container, Row } from 'react-bootstrap'
import styles from './yellow.module.css'
import YellowFancyContainer from '../yellowfancycontainer'
import Image from 'next/image'
import SchemeCard from "@/components/schemecard";
import { useRouter } from 'next/router';
import Link from 'next/link';

const strings = {
    more: {
        en: 'View All',
        ta: 'மேலும் ஏற்றுக'
    }
}

export default function YellowSchemes({ data, header, cta }) {
    const schemes = data.data.map(each => each.attributes)
    const { locale } = useRouter();
    return (<YellowFancyContainer>
        <div className='py-5'>
            <h3 className='py-4'>
                {header.heading}
            </h3>
            <p>
                {header.description}
            </p>
            <Row className='mt-5'>
                {schemes.map((each, index) => {
                    return (
                        <Col md={6} lg={3} key={index}>
                            <SchemeCard
                                mini={true}
                                link={"/finance/schemes/" + each.scheme_link}
                                title={each.scheme_name}
                                icon={each.icon}
                                description={each.scheme_description}
                                government={each.government}
                                implementingAgency={each.finance_scheme_implementing_agency?.data?.attributes?.name}
                            />
                        </Col>
                    )
                })}
            </Row>
            <div className='mt-4 pb-4'>
                <center>
                    <Link href={cta.url}>
                        <div className={styles.morebutton}>
                            {cta.text}
                        </div>
                    </Link>
                </center>
            </div>
        </div>
    </YellowFancyContainer>)
}