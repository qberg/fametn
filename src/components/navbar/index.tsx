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

const Navbar = ({ onSearch } : JSONData) => {

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
					<img className="d-none d-lg-inline" src="/tn_logo.png" alt="Logo" style={{ marginRight: '12px' }} />
					<img className="d-none d-lg-inline" src="/Line 1.png" alt="Logo" style={{ marginRight: '12px' }} />
					<img src="/fame_tn_logo.png" alt="Logo" />
				</div>
				<div style={{ display: 'flex', alignItems: 'center', marginLeft: '17px' }}>
					<div className="d-none d-lg-block">
						<SearchBox handleSearch={handleSearch} />
					</div>
					<img className="d-none d-lg-block" src="/Line 1.png" alt="Logo" style={{ marginRight: '10px', marginLeft: '15px' }} />
					<div className="borderDiv">
						<LanguageIcon />
						<select value={lang} onChange={switchLocale} className="drop">
							<option value="en">EN</option>
							<option value="ta">TA</option>
						</select>
					</div>
					<img src="/Line 1.png" alt="Logo" style={{ marginLeft: '5px', marginRight: '7px' }} />
					<div className="yellowbutton ms-3 d-flex">
						<div className='me-2'>Menu</div> <MenuIcon />
					</div>
				</div>
			</nav>
			</Container>
		</div>
	);
};

export default Navbar;
