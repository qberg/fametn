import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageIcon from "@mui/icons-material/Language";
import styles from "./navbar.module.css"; // Assuming you're using CSS modules
import { Col, Container, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import YellowArrowButton from "../yellow_arrow_button";
import Image from "next/image";

const strings = {
  lang: {
    en: "EN",
    ta: "த",
  },
  more: {
    en: "Menu",
    ta: "மெனு",
  },
  close: {
    en: "Close",
    ta: "மூடு",
  },
};

function SuperLink({ header, items }) {
  const [open, setOpen] = useState(false);
  const megaboxRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOutsideMegabox =
        megaboxRef.current && !megaboxRef.current.contains(event.target);
      const clickedOutsideButton =
        buttonRef.current && !buttonRef.current.contains(event.target);
      if (clickedOutsideButton && clickedOutsideMegabox) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        role="button"
        data-aos-once="true"
        className="me-4 ms-3 d-inline-flex"
      >
        <div className="me-2 my-auto ">
          <div className={styles.navbarItem}>{header}</div>
        </div>
        <div className="my-auto">
          <Image src="/navdownarrow.svg" width={10} height={10} />
        </div>
      </div>
      {open && (
        <div data-aos="fade-down" className={styles.megabox}>
          <div ref={megaboxRef} className={styles.actualmegabox}>
            <Container className="py-5">
              <Row>
                {items.map((item, index) => {
                  return (
                    <Col lg={3} key={index}>
                      <Link href={item.head.url || "#"}>
                        <h5>
                          <u>{item.head.text}</u>
                        </h5>
                        {item.items.map((subitem, subindex) => {
                          return (
                            <Link key={subindex} href={subitem.url || "#"}>
                              <div className="mt-4">{subitem.text}</div>
                            </Link>
                          );
                        })}
                      </Link>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}

const Navbar = ({ data, pageProps }) => {
  const router = useRouter();

  const { locale } = router;
  const [lang, setLang] = useState(locale);
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLocale = (event) => {
    const targetLanguage = event.target.value;
    const { pathname, asPath, query } = router;
    setLang(targetLanguage);
    router.push({ pathname, query }, asPath, { locale: targetLanguage });
  };

  const [headerLinks, setHeaderLinks] = useState(data.header_links);

  const allHeaderLinks = headerLinks;
  const lastHeaderLink = allHeaderLinks[allHeaderLinks.length - 1];
  const otherHeaderLinks = allHeaderLinks.slice(0, allHeaderLinks.length - 1);

  const OtherHeaderLinks = () => {
    return (
      <div>
        {otherHeaderLinks.map((each, index) => {
          return (
            <Link className="me-4 ms-3" key={index} href={each.url || "#"}>
              <div
                data-aos-once="true"
                className="d-inline-block"
                data-aos-delay={100}
              >
                <div className={styles.navbarItem}>{each.text}</div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  const OtherHeaderLinksMemo = React.memo(OtherHeaderLinks);

  const LanguageSelector = () => {
    return (
      <>
        <LanguageIcon />
        <select value={lang} onChange={switchLocale} className="drop ms-2">
          <option value="en">{strings.lang.en}</option>
          <option value="ta">{strings.lang.ta}</option>
        </select>
      </>
    );
  };

  const totalDelay = 100 + data.header_links.length * 50;

  return (
    <div className={styles.navbar_wrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href="/">
            <img
              className="d-none d-lg-inline me-3"
              src="/tn_logo.png"
              alt="Logo"
            />
            <img
              data-aos-delay={50}
              className="d-none d-lg-inline me-3"
              src="/Line 1.png"
              alt="Logo"
            />
            <img data-aos-delay={100} src="/fame_tn_logo.png" alt="Logo" />
          </Link>
        </div>
        <div className="d-none d-lg-flex align-items-center ms-2">
          <SuperLink
            header={data.header_superlink_text}
            items={data.header_superlink_items}
          />
          <OtherHeaderLinksMemo />
          <div
            data-aos-once="true"
            data-aos-delay={totalDelay + 200}
            className="me-2 ms-2"
          >
            <LanguageSelector />
          </div>
          <div
            data-aos-once="true"
            data-aos-delay={totalDelay + 200 + 500}
            className="ms-3"
          >
            <YellowArrowButton
              text={lastHeaderLink.text}
              link={lastHeaderLink.url}
            />
          </div>
        </div>
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="d-flex d-lg-none align-items-center"
        >
          <YellowArrowButton
            onClick={() => setMenuOpen(true)}
            text={strings.more[locale]}
          />
        </div>
        {menuOpen && (
          <div data-aos="fade-up" className={styles.mobile_menu}>
            <div className={styles.actual_mobile_menu}>
              <div className="w-100 d-flex flex-column">
                <h6 className="text-end w-100 mb-2">
                  {data.header_superlink_text}
                </h6>
                {data.header_superlink_items.map((item, index) => {
                  return (
                    <div key={index} className="d-flex flex-column">
                      <div className="my-2 ms-auto text-right">
                        <Link href={item.head.url || "#"}>
                          <u>{item.head.text}</u>
                        </Link>
                      </div>
                      {item.items.map((subitem, subindex) => {
                        return (
                          <Link
                            key={subindex}
                            href={subitem.url || "#"}
                            className="my-2 ms-auto  small text-right"
                          >
                            {subitem.text}
                          </Link>
                        );
                      })}
                      <hr></hr>
                    </div>
                  );
                })}
              </div>
              {otherHeaderLinks.map((each, index) => {
                return (
                  <Link
                    className="mb-2 ms-auto w-100 d-flex flex-column"
                    href={each.url || "#"}
                    key={index}
                  >
                    <div className="ms-auto">{each.text}</div>
                  </Link>
                );
              })}
              <div className="mt-auto ms-auto d-flex">
                <div
                  className="my-auto me-4"
                  role="button"
                  onClick={() => setMenuOpen(false)}
                >
                  <u>{strings.close[locale]}</u>
                </div>
                <Link href={lastHeaderLink.url || "#"}>
                  <div>
                    <YellowArrowButton
                      text={lastHeaderLink.text}
                      link={lastHeaderLink.url}
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      <NextNProgress color="var(--yellow)" {...pageProps} />
    </div>
  );
};

export default Navbar;
