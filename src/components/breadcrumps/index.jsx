// breadcrumps component in next js
// this component accepts a list of {text, url} objects and renders a breadcrump

import React from 'react';
import styles from './breadcrumps.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Container } from 'react-bootstrap';



const CONSTANTS = {
	"home": {
		"en": "Home",
		"ta": "முகப்பு"
	}
}


const Breadcrumps = ({ items }) => {
	// get current locale from nextjs and populate locale variable
	const router = useRouter()


	return (
		<Container className='pt-4'>
			<div className={styles.breadcrumpsContainer}>
				{items.map((item, index) => {
					return (
						<div key={index} className={styles.breadcrump}>
							{/* add right arrow if not first item */}
							{index !== 0 && <div className={styles.arrow}> &gt;</div>}

							{/* add hyperlinked item */}
							<Link href={item?.url || "/"}>
								{item.text}
							</Link>
						</div>)
				})}

			</div>
		</Container>
	)
}


export default Breadcrumps;