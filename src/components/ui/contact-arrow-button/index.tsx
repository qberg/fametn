import styles from "./styles.module.css";
import Link from "next/link";
import { JSONData } from "@/utils/definitions";
import { ArrowRight } from "lucide-react";

export const ContactArrowButton = ({
  text,
  target,
  link,
  lightArrow,
}: JSONData) => {
  const child = (
    <div className={styles.noarrow}>
      <p className={styles.text}>{text}</p>
      <div className={styles.arrow} data-light={lightArrow}>
        <ArrowRight />
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
