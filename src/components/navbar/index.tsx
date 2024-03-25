import React from 'react';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import styles from './navbar.module.css'; // Assuming you're using CSS modules
import { Container } from 'react-bootstrap';
import { JSONData } from '@/utils/definitions';
import SearchBox from '../searchbox';
import { useRouter } from 'next/router'

const Navbar = ({ onSearch } : JSONData) => {

	const router = useRouter()

	const handleSearch = (event : JSONData) => {
		const query = event.target.value;
		onSearch(query);
	};

	const switchLocale = (event: JSONData) => {
		const targetLanguage: string = event.target.value;
		const { pathname, asPath, query } = router

		router.push({ pathname, query }, asPath, { locale: targetLanguage })
	}

	return (
		<div className={styles.navbar_wrapper}>
			<Container>
			<nav className="navbar">
				<div className={styles.logo}>
					<img src="/tn_logo.png" alt="Logo" style={{ marginRight: '12px' }} />
					<img src="/Vector 8.png" alt="Logo" style={{ marginRight: '12px' }} />
					<img src="/fame_tn_logo.png" alt="Logo" />
				</div>
				<div style={{ display: 'flex', alignItems: 'center', marginLeft: '17px' }}>
					<SearchBox handleSearch={handleSearch} />
					<img src="/Line 1.png" alt="Logo" style={{ marginRight: '10px', marginLeft: '15px' }} />
					<div className="borderDiv">
						<LanguageIcon />
						<select onChange={switchLocale} className="drop ms-">
							< option value="en">EN</option>
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
