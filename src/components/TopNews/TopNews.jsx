import React from "react";
import { Container, Row, Button, Image } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./TopNews.module.css";
import SwiperCustom from "../../shared/swipper/SwiperCustom";
import SectionHeader from "../../shared/heading/SectionHeader";

export default function TopNews() {
  const newsItems = [
    {
      title:
        "‘Thunderbolts*’ Stays No. 1 With $33 Million, ‘A Minecraft Movie’ Crosses $400 Million at Domestic Box Office",
      source: "Variety Film + TV",
      date: "May 11",
      image:
        "https://m.media-amazon.com/images/M/MV5BZTYwODdjMzUtNTg1ZS00YmZhLTk0NmUtMGQ1ZThhN2FmOWRlXkEyXkFqcGc@._V1_QL75_UY266_CR110,0,180,266_.jpg",
    },
    {
      title:
        "Box Office Warner Bros. Milestone: ‘Sinners’ Crosses $200M, ‘Minecraft’ Digs Up $900M Globally",
      source: "The Hollywood Reporter - Movie News",
      date: "May 10",
      image:
        "https://m.media-amazon.com/images/M/MV5BZmY2NjhlNDItZTI5NS00NWNhLTlhOWMtMjdjN2VkYTg1MzkxXkEyXkFqcGc@._V1_QL75_UY266_CR43,0,180,266_.jpg",
    },
    {
      title:
        "‘Black Dog’ Director Guan Hu Brings $80 Million WWII Epic ‘Dong Ji Island’ to Cannes Market With Seventh Art Pictures",
      source: "Variety - Film News",
      date: "May 10",
      image:
        "https://m.media-amazon.com/images/M/MV5BYTJhYjMwNTYtYjg2Zi00YTJkLWE2N2ItZTNkYjg1YTJjOWQxXkEyXkFqcGc@._V1_QL75_UY266_CR110,0,180,266_.jpg",
    },
    {
      title:
        "Tom Cruise Says He Was Cast in ‘Rain Man’ After His Sister Forced Him to Go Up to Dustin Hoffman at a Restaurant: ‘As I Was Leaving He Said, “I Want to Make a Movie With You”’",
      source: "Variety - Film News",
      date: "May 10",
      image:
        "https://m.media-amazon.com/images/M/MV5BODVlZjM3OTEtZTNhNi00Zjc4LWFmOGQtZjEzNTg3MjNmNWNhXkEyXkFqcGc@._V1_QL75_UY266_CR110,0,180,266_.jpg",
    },
    {
      title:
        "Michelle Yeoh to Lead Stylized Action Film ‘The Surgeon’ From ‘The Resident’ Creator Roshan Sethi and ‘John Wick’ Collaborators, 193 Launching in Cannes",
      source: "Variety - Film News",
      date: "May 11",
      image:
        "https://m.media-amazon.com/images/M/MV5BMDYzMDk3MjAtOGViNS00ZGU0LWEyMWEtZGM4Y2I5ODc0ZWNlXkEyXkFqcGc@._V1_QL75_UY266_CR122,0,180,266_.jpg",
    }
  ];

  const renderNewsItem = (item) => (
    <div className="d-flex gap-3 text-white">
      <Image src={item.image} rounded className={styles.newsImage} />
      <div>
        <p className="mb-1 fw-semibold lh-sm">{item.title}</p>
        <small className="text-secondary">
          {item.date} · {item.source}
        </small>
      </div>
    </div>
  );

  return (
    <Container className={`${styles.section} py-4`}>
      <SectionHeader title="Top news" />
      <SwiperCustom
        id="top-news"
        items={newsItems}
        renderItem={renderNewsItem}
        slidesPerView={3}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
        }}
      />
    </Container>
  );
}
