"use client";

import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import { useState } from "react";
import DynamicImage from "../../dynamicImage";
import { PlayCircleFilled } from "@mui/icons-material";
import Marquee from "../marquee";

const HeroWithVideo = ({ title, tag, description, video }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const videoSrc = video?.src?.data?.attributes?.url;
  const videoUrl = process.env.NEXT_PUBLIC_IMG_ENDPOINT + videoSrc;
  const videoType = video.src.data.attributes.mime;
  const imageSrc = video.thumbnail;

  return (
    <div className={styles.heroSection}>
      <Container fluid className={styles.heroContainer}>
        <Row className={styles.heroRow}>
          <Col lg={6} className={styles.contentCol}>
            <div className={styles.contentWrapper}>
              <h1 className={styles.title} data-aos="fade-up">
                {title}
              </h1>
              <div className={styles.bottomContent}>
                <div
                  className={styles.badge}
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  {tag}
                </div>
                <p
                  className={styles.description}
                  data-aos="fade-up"
                  data-aos-delay={100}
                >
                  {description}
                </p>
              </div>
            </div>
          </Col>

          <Col lg={6} className={styles.mediaCol}>
            <div
              className={styles.mediaContainer}
              data-aos="fade-up"
              data-aos-delay={200}
            >
              {!isPlaying ? (
                <>
                  <div className={styles.thumbnailWrapper}>
                    <DynamicImage src={imageSrc} objectFit="cover" />
                  </div>
                  <button
                    className={styles.playButton}
                    onClick={handlePlay}
                    aria-label="Play Video"
                  >
                    <PlayCircleFilled fontSize="inherit" />
                  </button>
                </>
              ) : (
                <video controls autoPlay className={styles.video}>
                  <source src={videoUrl} type={videoType} />
                </video>
              )}
            </div>
          </Col>
        </Row>
      </Container>
      <Marquee text={tag} length={20} />
    </div>
  );
};

export default HeroWithVideo;
