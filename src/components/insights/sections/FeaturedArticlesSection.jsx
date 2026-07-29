"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

export const FeaturedArticlesSection = ({ articles }) => {
  const getLink = useLocalizedLink();

  return (
    <section className="featured-articles-section">
      <div className="content container">
        <h2>Featured Articles</h2>
        <p>
          Dive into thought-provoking articles on entrepreneurship, emerging technologies, market trends, and startup strategies.
        </p>
      </div>

      {/* Article content is fully rendered for SEO */}
      <div className="relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          // pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1.25,
              slidesOffsetBefore: 15,
              slidesOffsetAfter: 15,
            },
            768: {
              slidesPerView: 2,
              slidesOffsetBefore: 15,
              slidesOffsetAfter: 15,
            },
            1024: {
              slidesPerView: 2.5,
              slidesOffsetBefore: 160,
              slidesOffsetAfter: 160,
            },
          }}
        >
          {articles?.map((article, idx) => (
            <SwiperSlide key={idx}>
              <Link href={getLink(`/insights/${article.id}`)}>
                <div className="article-card">
                  <div className="article-image">
                    <Image
                      src={article?.cover_image_url}
                      alt={article?.title?.en}
                      fill
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <div className="article-content">
                    <h3>{article?.title?.en}</h3>
                    <div className="flex items-center gap-6">
                      <span>{article?.author}</span>
                      <span>
                        {dayjs(article?.published_at).format("YYYY-MM-DD")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-navigation">
          <button className="swiper-button-prev">
            <GoChevronLeft />
          </button>
          <button className="swiper-button-next">
            <GoChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};
