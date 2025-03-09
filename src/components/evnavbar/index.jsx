import Image from 'next/image';
import Link from 'next/link';
import NextNProgress from 'nextjs-progressbar';
import { Container } from 'react-bootstrap';
import EvButton from '../evtf/button';
import { useRouter } from 'next/router';
import styles from "./styles.module.css";
import { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';

function NormalLink({ item }) {
    return (<Link href={item.url || "#"} className='ms-5 my-auto'>
        <div className='my-auto'>
            {item.text}
        </div>
    </Link>)
}

function FancyLink({ item }) {
    return (<div className='ms-4'>
        <EvButton text={item.text} link={item.url} />
    </div>)
}

export default function EvNavbar({ data, pageProps }) {
    const strings = {
        menu: {
            en: "Menu",
            ta: "மெனு"
        },
        close: {
            en: "Close",
            ta: "மூடு"
        },
        lang: {
            en: 'EN',
            ta: 'த'
        },
    }
    const router = useRouter()


    const { locale } = router;
    const [lang, setLang] = useState(locale)

    const switchLocale = (event) => {
        const targetLanguage = event.target.value;
        const { pathname, asPath, query } = router
        setLang(targetLanguage);
        router.push({ pathname, query }, asPath, { locale: targetLanguage })
    }

    const [menuOpen, setMenuOpen] = useState(false)

    const LanguageSelector = () => {
        return (<div className='d-flex'>
            <div className="my-auto me-1 ms-4">
                <LanguageIcon />
            </div>
            <div className="my-auto">
                <select value={lang} onChange={switchLocale} className="drop ms-1">
                    <option value="en">{strings.lang.en}</option>
                    <option value="ta">{strings.lang.ta}</option>
                </select>
            </div>
        </div>)
    }

    return (<div>
        <Container className='position-relative'>
            <div className="d-flex w-100 py-3">
                <div className='my-auto me-3'>
                    <Image src="/evlogo.webp" width={50} height={33} />
                </div>
                <div className="ms-auto my-auto d-none d-lg-flex">
                    {data.links.map((each, index) => {
                        return (<NormalLink item={each} key={index} />)
                    })}
                    <LanguageSelector />

                    {data.buttons.map((each, index) => {
                        return (<FancyLink item={each} key={index} />)
                    })}
                </div>

                <div onClick={() => setMenuOpen(!menuOpen)} className="ms-auto my-auto d-lg-none">
                    <EvButton text={strings.menu[locale]} />
                </div>
            </div>
            {menuOpen && <div data-aos="fade-up" className={styles.mobile_menu}>
                <div className={styles.actual_mobile_menu}>
                    {data.links.map((each, index) => {
                        return (<div key={index} className='ms-auto'>
                            <NormalLink item={each} />
                        </div>)
                    })}

                    {data.buttons.map((each, index) => {
                        return (<div key={index} className='ms-auto'>
                            <u>
                                <NormalLink item={each} />
                            </u>
                        </div>)
                    })}

                    <div className='ms-auto mt-4'>
                        <LanguageSelector />
                    </div>
                    <div onClick={() => setMenuOpen(false)} className='ms-auto mt-auto'>
                        <EvButton text={strings.close[locale]} />
                    </div>
                </div>
            </div>}
        </Container>

        <NextNProgress color="var(--evmid)" {...pageProps} />
    </div>)
}