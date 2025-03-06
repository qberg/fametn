import styles from "./styles.module.css";

const Marquee = ({ text, length }) => {
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marquee}>
        {Array(length)
          .fill(text)
          .map((item, index) => (
            <span key={index} className={styles.marqueeItem}>
              {item}
            </span>
          ))}
      </div>
    </div>
  );
};

export default Marquee;
