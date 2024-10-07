import Link from 'next/link';
import styles from './bluearrow.module.css';
import { JSONData } from '@/utils/definitions';
import Image from 'next/image'

const BlueArrow = ({text, link} : JSONData) => {
    const child = (<div className={styles.bluearrow}>
        {text}
        <div className={styles.arrow}> 
            <Image
                src="/bluearrow.svg"
                alt="->"
                width={10}
                height={10}
            />
        </div>
    </div>)

  
  return link? (<Link href={link}>{child}</Link>) : (<>{child}</>);
};

export default BlueArrow;
