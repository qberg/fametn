import React, { useState } from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './navbar.module.css'; // Assuming you're using CSS modules
import { Container } from 'react-bootstrap';
import { JSONData } from '@/utils/definitions';
import SearchBox from '../searchbox';
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar';

const Navbar = ({ onSearch, pageProps} : JSONData) => {

	const router = useRouter()

	const {locale} = router
	const [lang, setLang] = useState(locale)

	const handleSearch = (event : JSONData) => {
		const query = event.target.value;
		onSearch(query);
	};

	const switchLocale = (event: JSONData) => {
		const targetLanguage: string = event.target.value;
		const { pathname, asPath, query } = router
		setLang(targetLanguage);
		router.push({ pathname, query }, asPath, { locale: targetLanguage })
	}

	return (
		<div className={styles.navbar_wrapper}>
			<Container>
			<nav className="navbar">
				<div className={styles.logo}>
					<img className="d-none d-lg-inline me-3" src="/tn_logo.png" alt="Logo" />
					<img className="d-none d-lg-inline me-3" src="/Line 1.png" alt="Logo"  />
					<img src="/fame_tn_logo.png" alt="Logo" />
				</div>
				<div className='d-flex align-items-center ms-2'>
					<div className="d-none d-lg-block">
						<SearchBox handleSearch={handleSearch} />
					</div>
					<img className="d-none d-lg-block ms-2 me-3" src="/Line 1.png" alt="Logo"  />
					<div className="borderDiv">
						<LanguageIcon />
						<select value={lang} onChange={switchLocale} className="drop">
							<option value="en">EN</option>
							<option value="ta">TA</option>
						</select>
					</div>
					<img src="/Line 1.png" alt="Logo" className='ms-1 me-1' />
					<div className="yellowbutton ms-3 d-flex">
						<div className='me-2'>Menu</div> <MenuIcon />
					</div>
				</div>
			</nav>
			</Container>
			<NextNProgress color="var(--yellow)" {...pageProps}/>
		</div>
	);
};

export default Navbar;
