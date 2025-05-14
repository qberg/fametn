import { Mail } from "lucide-react";
import DynamicImage from "../../dynamicImage";
import styles from "./styles.module.css";

const MemberCard = ({
  name,
  role,
  dp,
  email,
  tel,
  linkedin,
  address,
  index,
}) => {
  return (
    <div
      className={styles.memberCard}
      data-aos="fade-up"
      data-aos-delay={50 * index}
    >
      <div data-aos="fade-up" className={styles.cardImage}>
        <DynamicImage src={dp} objectFit="cover" />
      </div>

      <div className={styles.cardContent}>
        <div>
          {name && <div className={styles.name}>{name}</div>}

          {role && (
            <div data-aos="fade-up">
              {role.split(",").map((part, idx) => (
                <div key={idx}>{part.trim()}</div>
              ))}
            </div>
          )}
        </div>

        <div data-aos="fade-up">
          {address && (
            <div>
              {address.split(",").map((part, idx) => (
                <div key={idx}>{part.trim()}</div>
              ))}
            </div>
          )}
        </div>

        <div data-aos="fade-up">
          {linkedin && (
            <div>
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <div className={styles.cta}>LinkedIn</div>
              </a>
            </div>
          )}

          {email && (
            <div data-aos="fade-up">
              <a href={`mailto:${email}`}>
                <div className={styles.cta}>
                  <div className={styles.mailLogo}>
                    <Mail />
                  </div>
                  <div className={styles.mail}>Send Email</div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
