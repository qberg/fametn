import DynamicImage from "../../dynamicImage";
import styles from "./styles.module.css";

const LeaderCard = ({ name, role, dp, email, tel, badge, index }) => {
  return (
    <div
      className={styles.leaderCard}
      data-aos="fade-up"
      data-aos-delay={50 * index}
    >
      <div className={styles.leaderCardImage} data-aos="fade-up">
        <DynamicImage src={dp} objectFit="cover" />
        <div className={styles.badge}>{badge || "Leadership"}</div>
      </div>

      <div className={styles.leaderCardContent} data-aos="fade-up">
        {name && <div className={styles.name}>{name}</div>}

        {role && (
          <div className={styles.role} data-aos="fade-up">
            {role.split(",").map((part, idx) => (
              <div key={idx}>{part.trim()}</div>
            ))}
          </div>
        )}

        <div>
          {tel && <div data-aos="fade-up">{tel}</div>}
          {email && (
            <div data-aos="fade-up">
              <a href={`mailto:${email}`}>
                <div className={styles.mail}>Email</div>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderCard;
