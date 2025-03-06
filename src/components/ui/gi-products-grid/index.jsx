import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import GIProductCard from "../gi-product-card";

const GIProductsGrid = ({ products }) => {
  if (!products || products.length === 0) return <p>No products available.</p>;
  return (
    <div className={styles.productsSection}>
      <div className={styles.header} data-aos="fade-up">
        Products
      </div>
      <Container fluid className={styles.productsContainer}>
        <Row className={styles.productsRow}>
          {products.map(
            (
              {
                id,
                attributes: {
                  name,
                  description,
                  location,
                  issued_date,
                  featured_image,
                },
              },
              index,
            ) => {
              return (
                <Col
                  key={id}
                  className={`${styles.productsCol} colXXL`}
                  xl={3}
                  lg={4}
                  md={6}
                  xs={12}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <GIProductCard
                    name={name}
                    description={description}
                    location={location}
                    issuedDate={issued_date}
                    featuredImage={featured_image}
                  />
                </Col>
              );
            },
          )}
        </Row>
      </Container>
    </div>
  );
};

export default GIProductsGrid;

{
  /* 
      <pre>{JSON.stringify(products[0], null, 3)}</pre>
*/
}
