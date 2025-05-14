import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import LeaderCard from "../leader-card";
import DynamicImage from "../../dynamicImage";
import { Mail } from "lucide-react";
import MemberCard from "../member-card";

const TeamMembersGrid = ({ heading, otherHeading, allTeams }) => {
  return (
    <section className={styles.teamSection}>
      {/*Leadership */}
      <Container className="py-4">
        <h2 data-aos="fade-up" className="markedTitle">
          {heading || "Leadership"}
        </h2>

        <Row>
          {allTeams.map((member, index) =>
            member.leadership ? (
              <Col
                data-aos="fade-up"
                xs={12}
                md={4}
                key={index}
                className={styles.leaderCol}
              >
                <LeaderCard index={index} {...member} />
              </Col>
            ) : null,
          )}
        </Row>
      </Container>

      {/* Team Memebers */}
      <Container className="py-4">
        <h2 data-aos="fade-up" className="markedTitle">
          {otherHeading || "FaMe TN Team"}
        </h2>

        <Row>
          {allTeams.map((member, index) =>
            !member.leadership ? (
              <Col
                xs={12}
                md={6}
                lg={6}
                key={index}
                className={styles.memberCol}
              >
                <MemberCard index={index} {...member} />
              </Col>
            ) : null,
          )}
        </Row>
      </Container>
    </section>
  );
};

export default TeamMembersGrid;
