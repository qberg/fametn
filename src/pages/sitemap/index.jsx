import Link from "next/link";
import styles from "./styles.module.css";
export default function SiteMap() {
  const lists = [
    "/",
    "/blogs",

    "/branding-and-packaging",
    "/emarkets",

    "/quality-and-sustainability/energy-efficiency",
    "/quality-and-sustainability/testing-labs",
    "/events",
    "/export-promotion-councils",
    "/export-promotions",
    "/expos-and-exhibitions",
    "/schemes",
    "/schemes/unemployed-youth-employment-generation",

    "/markets",
    "/resources",
    "/vendor-development-meets",
    "/micro-and-small-enterprises-facilitation-council",
    "/ondc",
    "/investment-promotion/",
    "/energy-efficiency",
    "/industry-4-0",
    "/lean",

    "/tenders",
    "/trade-associations-and-chambers",
    "/awards",
    "/gallery",
    "/odop",
    "/teams",
    "/aboutus",

    "/evtf",
    "/evtf/teams",
    "/evtf/about",

    "/sectors",
    "/sectors/ev",
    "/sectors/food-processing",
    "/exports",

    "/gi-products",
    "/gi-products/agricultural-products",
    "/gi-products/table",
  ];

  return (
    <div>
      <h1>SiteMap</h1>
      {lists.map((list, index) => {
        return (
          <Link target="_blank" className={styles.blue} key={index} href={list}>
            {list} <br></br>
          </Link>
        );
      })}
    </div>
  );
}
