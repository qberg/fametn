import Image from 'next/image';
import Link from 'next/link';
import NextNProgress from 'nextjs-progressbar';
import { Container } from 'react-bootstrap';
import EvButton from '../evtf/button';

function NormalLink({ item }) {
    return (<Link href={item.url || "#"} className='ms-5 my-auto'>
        <div className='my-auto'>
            {item.text}
        </div>
    </Link>)
}

function FancyLink({ item }) {
    return (<div className='ms-5'>
        <EvButton text={item.text} link={item.url} />
    </div>)
}

export default function EvNavbar({ data, pageProps }) {
    console.log(data)
    return (<div>
        <Container>
            <div className="d-flex w-100 py-3">
                <div className='my-auto me-3'>
                    <Image src="/evlogo.webp" width={50} height={33} />
                </div>
                <div className="ms-auto my-auto d-none d-lg-flex">
                    {data.links.map((each, index) => {
                        return (<NormalLink item={each} key={index} />)
                    })}
                    {data.buttons.map((each, index) => {
                        return (<FancyLink item={each} key={index} />)
                    })}
                </div>
            </div>
        </Container>

        <NextNProgress color="var(--evmid)" {...pageProps} />
    </div>)
}