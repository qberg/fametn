import { Container } from "react-bootstrap";
import SectorCard from "../sector-card";
import styles from "./sectorslist.module.css";

const SectorsList = ({ sectors }) => {
  return (
    <div className={styles.sectorsListContainer}>
      <Container>
        {sectors &&
          sectors.map((sector) => (
            <SectorCard key={sector.id} sector={sector} />
          ))}
      </Container>
    </div>
  );
};

export default SectorsList;
