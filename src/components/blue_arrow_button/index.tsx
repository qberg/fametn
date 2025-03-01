import Link from 'next/link';
import styles from './button.module.css';
import { JSONData } from '@/utils/definitions';
import Image from 'next/image'

export const JustArrowButton = ({ text, target, link, lightArrow }: JSONData) => {
    const child = (
        <div className={styles.noarrow}>
            {text}
            <div data-light={lightArrow} className={styles.arrow}>
                <Image
                    src="/right_arrow.svg"
                    alt="->"
                    width={10}
                    height={10}
                />
            </div>
        </div>)


    return link ? (<Link target={target} href={link}>{child}</Link>) : (<>{child}</>);
}

const BlueArrowButton = ({ text, target, link, full }: JSONData) => {
    const child = (<div data-full={full} className={styles.bluearrow}>
        <div className="my-auto">
            {text}
        </div>
        <div data-light={true} className={`my-auto d-flex ${styles.arrow}`}>
            <Image
                className='my-auto'
                src="/right_arrow.svg"
                alt="->"
                width={10}
                height={10}
            />
        </div>
    </div>)


    return link ? (<Link target={target} href={link}>{child}</Link>) : (<>{child}</>);
};

export default BlueArrowButton;
