import RootLayout from "../../components/layout/layout";
import { CacheHeaders } from "../../utils/definitions";

import { notFound } from "next/navigation";
import { getData } from "@/utils/api_calls";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./scheme.module.css";
import Link from "next/link";
import Image from "next/image";
import Breadcrumps from "@/components/breadcrumps";
import { useRouter } from "next/router";
import { getDataFromPath, getHeaderFooterData } from "../../utils/api_calls";
import SchemeStickyButton from "../../components/ui/scheme-sticky-button";

export const getServerSideProps = async (context) => {
  context.res.setHeader("Cache-Control", CacheHeaders);

  const { scheme } = context.query;
  const language = context.locale;

  const url =
    "https://" +
    process.env.API_ENDPOINT +
    "finance-schemes?filters[scheme_link][$eq]=" +
    scheme +
    "&populate=deep";
  const fullData = await getData(url, language);

  if (fullData.meta.pagination.total != 1) {
    context.res.writeHead(307, { Location: "/not-found" });
    context.res.end();
    return {
      props: {
        data: null,
        id: null,
      },
    };
  }

  const schemeMetaPath = "schemes?&populate=deep";
  const schemeMeta = await getDataFromPath(schemeMetaPath, language);

  return {
    props: {
      data: fullData.data[0].attributes,
      id: fullData.data[0].id,
      headerFooter: await getHeaderFooterData(language),
      schemeMeta: schemeMeta.data.attributes,
    },
  };
};

function YellowBannerItem({ data }) {
  return (
    <div data-aos="fade-up mt-5" className={styles.scheme_banner}>
      <div data-aos="fade-up" className="d-flex smallest">
        <div className={styles.black_info}>
          <div className={styles.red_square}></div>
          {data.government}
        </div>
        <div className={styles.black_info}>
          <div className={styles.blue_square}></div>
          {data.government}
        </div>
      </div>
      <h1 data-aos="fade-up">{data.scheme_name}</h1>
      <p data-aos="fade-up">{data.scheme_description}</p>
    </div>
  );
}

const strings = {
  ob: {
    en: "Objective",
    ta: "இலக்கு",
  },
  kb: {
    en: "Key Benefits",
    ta: "முக்கிய நன்மைகள்",
  },
  ec: {
    en: "Eligibility Criteria",
    ta: "தகுதி மாநிலங்கள்",
  },
  hta: {
    en: "How to Apply / Office To Contact",
    ta: "விண்ணப்ப செய்வது எப்படி / அலுவலகம் தொடர்பு கொள்ள",
  },
  bf: {
    en: "Beneficiaries",
    ta: "பயனாளிகள்",
  },
  sa: {
    en: "Successfully Applied",
    ta: "வெற்றிகரமாக விண்ணப்பிக்கப்பட்டது",
  },
  applynow: {
    en: "Apply Now",
    ta: "விண்ணப்பிக்கவும்",
  },
};

export default function Scheme({ data, id, headerFooter, schemeMeta }) {
  const locale = useRouter().locale;
  if (id == null) {
    notFound();
  }

  const breadData = [...schemeMeta.breadcrumps];
  breadData.push({
    id: id,
    url: `/schemes/${data.scheme_link}`,
    text: data.scheme_name,
  });

  const handleClick = () => {
    window.open(data?.cta_link || "/", "_blank", "noopener noreferrer");
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      const elementPosition = section.getBoundingClientRect().top;

      const offsetPosition = elementPosition + window.scrollY;

      const fixedTopOffset = 100;

      const finalPosition = offsetPosition - fixedTopOffset;

      section.scrollIntoView({ top: finalPosition, behavior: "smooth" });
    }
  };
  return (
    <RootLayout seo={schemeMeta.seo} data={headerFooter}>
      <Container className={styles.schemeContainer}>
        <SchemeStickyButton
          text={strings.applynow[locale]}
          handleClick={handleClick}
        />
        <div className={styles.bread}>
          <Breadcrumps items={breadData} />
        </div>
        <div className="my-4"></div>
        <YellowBannerItem data={data} />

        <div className={styles.scheme_content}>
          <Row>
            <Col lg={8}>
              <div
                data-aos="fade-up"
                className={`${styles.buttonContainer} d-none d-lg-block mb-3 small`}
              >
                <button
                  className={styles.button}
                  onClick={() => scrollToSection("objective")}
                >
                  {strings.ob[locale]}
                </button>
                <button
                  className={styles.button}
                  onClick={() => scrollToSection("key-benefits")}
                >
                  {strings.kb[locale]}
                </button>
                <button
                  className={styles.button}
                  onClick={() => scrollToSection("eligibility")}
                >
                  {strings.ec[locale]}
                </button>
                <button
                  className={styles.button}
                  onClick={() => scrollToSection("how-to-apply")}
                >
                  {strings.hta[locale]}
                </button>
              </div>

              <Row className={styles.new}>
                {data.benificiaries && data.successfully_applied && (
                  <>
                    <Col className={styles.gray_sep_right} md={5}>
                      <div
                        data-aos="fade-up"
                        className={styles.textAfterButtons}
                      >
                        {data.benificiaries}
                      </div>
                      <div data-aos="fade-up">{strings.bf[locale]}</div>
                    </Col>
                    <Col md={5}>
                      <div
                        data-aos="fade-up"
                        className={styles.textAfterButtons}
                      >
                        {data.successfully_applied}
                      </div>
                      <div data-aos="fade-up">{strings.sa[locale]}</div>
                    </Col>
                  </>
                )}
              </Row>

              <div className={styles.container}>
                <div className={styles.section}>
                  <div id="objective" data-aos="fade-up" className={styles.key}>
                    <Image
                      src={"/Goal_target.svg"}
                      alt=""
                      width={32}
                      height={32}
                    />
                    <h6>{strings.ob[locale]}</h6>
                  </div>
                  <div className={styles.bullet}>
                    <ul className={styles.bulletList}>
                      <li data-aos="fade-up">{data.objective}</li>
                    </ul>
                  </div>

                  <div
                    id="key-benefits"
                    data-aos="fade-up"
                    className={styles.key}
                  >
                    <Image
                      src={"/key_benefits.svg"}
                      alt=""
                      width={32}
                      height={32}
                    />
                    <h6>{strings.kb[locale]}</h6>
                  </div>
                  <div className={styles.bullet}>
                    <ul className={styles.bulletList}>
                      {data["key_benifits"].map((benefit) => (
                        <li data-aos="fade-up" key={benefit.id}>
                          {benefit.heading}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    id="eligibility"
                    data-aos="fade-up"
                    className={styles.key}
                  >
                    <Image
                      src={"/eligibility.svg"}
                      alt=""
                      width={32}
                      height={32}
                    />
                    <h6>{strings.ec[locale]}</h6>
                  </div>
                  <div className={styles.bullet}>
                    <ul className={styles.bulletList}>
                      {data["eligibility_criteria"].map((criteria) => (
                        <li data-aos="fade-up" key={criteria.id}>
                          <div data-aos="fade-up">{criteria.heading}</div>
                          <div
                            data-aos="fade-up"
                            className={`${styles.description} small`}
                          >
                            {criteria.description}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    id="how-to-apply"
                    data-aos="fade-up"
                    className={styles.key}
                  >
                    <Image
                      src={"/how_to_apply.svg"}
                      alt=""
                      width={32}
                      height={32}
                    />
                    <h6>{strings.hta[locale]}</h6>
                  </div>
                  <div className={styles.bullet}>
                    <ul className={styles.linksty}>
                      <li data-aos="fade-up">
                        <Link href={data?.cta_link || "#"}>
                          {data.how_to_apply_description}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div data-aos="fade-up" className={styles.ctabox}>
                <div data-aos="fade-up" className={styles.ctahead}>
                  {strings.hta[locale]}
                </div>
                <p data-aos="fade-up" className="small mt-2">
                  {data.how_to_apply_cta_description}
                </p>

                <div
                  data-aos="fade-up"
                  className="bluebutton"
                  onClick={handleClick}
                >
                  <div className="ms-auto me-2 my-auto">
                    <Image
                      src="/apply_arrow.svg"
                      alt="->"
                      width={16}
                      height={16}
                    />
                  </div>
                  <div className="me-auto small my-auto">
                    {strings.applynow[locale]}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </RootLayout>
  );
}

