import Image from 'next/image';
import styles from './gigasearch.module.css';
import { useRouter } from 'next/router';

const strings = {
    "search" : {
        "en" : "Search",
        "ta" : "தேடு"
    }
}

export default function Gigasearch() {
    const {locale} = useRouter();
    return (
        <div className={styles.search}>
            <div className='my-auto me-2'>
                <Image className={styles.searchicon} src="/gigsearch.svg" alt="Gigasearch" width={22} height={22} />
            </div>
            <div className='my-auto w-100'>
                <input className={styles.searchinput} type="text" placeholder={strings.search[locale]} />
            </div>
        </div>
    )
}