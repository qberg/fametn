import Image from 'next/image';
import styles from './gigasearch.module.css';
import { useRouter } from 'next/router';
import YellowArrowButton from '../yellow_arrow_button';

const strings = {
    "search": {
        "en": "Search",
        "ta": "தேடு"
    }
}

export default function Gigasearch({ text, onSearch, handleSearch }) {
    const { locale } = useRouter();
    const searchHandler = () => {
        handleSearch();
    }
    return (
        <div className={styles.search}>
            <div className='my-auto me-2'>
                <Image className={styles.searchicon} src="/gigsearch.svg" alt="Gigasearch" width={22} height={22} />
            </div>
            <div className='my-auto w-100'>
                <input type="text"
                    onChange={(e) => onSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchHandler()}
                    value={text}
                    className={styles.searchinput}
                    placeholder={strings.search[locale]} />
            </div>
            <div onClick={searchHandler} className={styles.searchbutton}>
                <YellowArrowButton text={strings.search[locale]} />
            </div>
        </div>
    )
}