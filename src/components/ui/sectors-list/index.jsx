import { Container } from "react-bootstrap";
import SectorCard from "../sector-card";

const SectorsList = ({ sectors }) => {
  return (
    <div className="">
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
