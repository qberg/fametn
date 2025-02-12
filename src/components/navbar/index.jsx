import React, { useState } from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import styles from './navbar.module.css'; // Assuming you're using CSS modules
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar';
import YellowArrowButton from '../yellow_arrow_button';

const strings = {
	lang: {
		en: 'EN',
		ta: 'த'
	},
	more: {
		en: 'Menu',
		ta: 'மெனு'
	},
	close: {
		en: 'Close',
		ta: 'மூடு'
	}
}


const Navbar = ({ data, pageProps }) => {
	const router = useRouter()

	const { locale } = router
	const [lang, setLang] = useState(locale)
	const [menuOpen, setMenuOpen] = useState(false)

	const switchLocale = (event) => {
		const targetLanguage = event.target.value;
		const { pathname, asPath, query } = router
		setLang(targetLanguage);
		router.push({ pathname, query }, asPath, { locale: targetLanguage })
	}

	const allHeaderLinks = data.header_links;
	const lastHeaderLink = allHeaderLinks[allHeaderLinks.length - 1];
	const otherHeaderLinks = allHeaderLinks.slice(0, allHeaderLinks.length - 1);



	const OtherHeaderLinks = () => {
		return (<div >
			{otherHeaderLinks.map((each, index) => {
				return (<Link className='me-4 ms-3' key={index} href={each.url || "#"}>
					<div data-aos="fade-up" className='d-inline-block' data-aos-delay={100 + index * 50}>
						{each.text}
					</div>
				</Link>)
			})}
		</div>)
	}

	const LanguageSelector = () => {
		return (<>
			<LanguageIcon />
			<select value={lang} onChange={switchLocale} className="drop ms-2">
				<option value="en">{strings.lang.en}</option>
				<option value="ta">{strings.lang.ta}</option>
			</select>
		</>)
	}

	const totalDelay = 100 + data.header_links.length * 50;
	return (
		<div className={styles.navbar_wrapper}>
			<Container>
				<nav className="navbar">
					<div className={styles.logo}>
						<img data-aos="fade-up" className="d-none d-lg-inline me-3" src="/tn_logo.png" alt="Logo" />
						<img data-aos="fade-up" data-aos-delay={50} className="d-none d-lg-inline me-3" src="/Line 1.png" alt="Logo" />
						<img data-aos="fade-up" data-aos-delay={100} src="/fame_tn_logo.png" alt="Logo" />
					</div>
					<div className='d-none d-lg-flex align-items-center ms-2'>
						<OtherHeaderLinks />
						<div data-aos="fade-up" data-aos-delay={totalDelay + 200} className='me-2 ms-2'>
							<LanguageSelector />
						</div>
						<div data-aos="fade-up" data-aos-delay={totalDelay + 200 + 500} className='ms-3'>
							<YellowArrowButton text={lastHeaderLink.text} link={lastHeaderLink.url} />
						</div>
					</div>
					<div onClick={() => setMenuOpen(!menuOpen)} className='d-flex d-lg-none align-items-center'>
						<YellowArrowButton onClick={() => setMenuOpen(true)} text={strings.more[locale]} />
					</div>
					{menuOpen && <div data-aos="fade-down" className={styles.mobile_menu}>
						<div className={styles.actual_mobile_menu}>
							{otherHeaderLinks.map((each, index) => {
								return (
									<Link className="mb-2 ms-auto w-100 d-flex flex-column" href={each.url || "#"} key={index}>
										<div className='ms-auto'>
											{each.text}
										</div>
									</Link>
								)
							})}
							<div className='mt-auto ms-auto d-flex'>
								<div className='my-auto me-4' role="button" onClick={() => setMenuOpen(false)}>
									<u>
										{strings.close[locale]}
									</u>
								</div>
								<Link href={lastHeaderLink.url || "#"}>
									<div >
										<YellowArrowButton text={lastHeaderLink.text} link={lastHeaderLink.url} />
									</div>
								</Link>
							</div>
						</div>
					</div>}
				</nav>
			</Container>
			<NextNProgress color="var(--yellow)" {...pageProps} />
		</div>
	);
};

export default Navbar;
