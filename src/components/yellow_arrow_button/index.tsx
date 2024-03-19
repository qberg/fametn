import Link from 'next/link';
import styles from './button.module.css';
import { JSONData } from '@/utils/definitions';
import Image from 'next/image'

const YellowArrowButton = ({text, link} : JSONData) => {
  return (
            <div className={styles.yellowarrow}>
                {text}
                <div className={styles.arrow}> 
                    <Image
                        src="right_arrow.svg"
                        alt="->"
                        width={10}
                        height={10}
                    />
                </div>
            </div>
  );
};

export default YellowArrowButton;
