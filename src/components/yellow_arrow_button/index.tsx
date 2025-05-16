import Link from "next/link";
import styles from "./button.module.css";
import { JSONData } from "@/utils/definitions";
import Image from "next/image";

export const JustArrowButton = ({
  text,
  target,
  link,
  lightArrow,
}: JSONData) => {
  const child = (
    <div className={styles.noarrow}>
      {text}
      <div data-light={lightArrow} className={styles.arrow}>
        <Image src="/right_arrow.svg" alt="->" width={10} height={10} />
      </div>
    </div>
  );

  return link ? (
    <Link target={target} href={link}>
      {child}
    </Link>
  ) : (
    <>{child}</>
  );
};

const YellowArrowButton = ({
  text,
  target,
  link,
  full,
  disabled = false,
}: JSONData & { disabled?: boolean }) => {
  const child = (
    <div
      data-full={full}
      className={`${styles.yellowarrow} ${disabled ? styles.disabled : ""} `}
    >
      {text}
      <div className={styles.arrow}>
        <Image src="/right_arrow.svg" alt="->" width={10} height={10} />
      </div>
    </div>
  );

  return link && !disabled ? (
    <Link target={target} href={link}>
      {child}
    </Link>
  ) : (
    <div
      onClick={(e) => e.preventDefault()}
      aria-disabled={disabled}
      role="button"
      tabIndex={-1}
    >
      {child}
    </div>
  );
};

export default YellowArrowButton;
